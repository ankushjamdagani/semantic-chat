import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import SmokeImage from "__IMAGES/smoke.png";
import StarsImage from "__IMAGES/stars.jpg";

import * as THREE from "three";
import * as POSTPROCESSING from "postprocessing";

import io from "socket.io-client";

import { Endpoints } from "__CONSTANTS";
import { getUserData, clearUserData } from "__SERVICES/auth";
import {
  ChatBox,
  FriendsList,
  SidebarHeader,
  SidebarFooter
} from "__COMPONENTS/widgets";

import {
  preserveSocketConn,
  updateFriendsList,
  updateMessagesList,
  changeActiveFriend,
  tryFetchingAllFriends,
  tryFetchingAllMessages
} from "./actions";
import "./styles.scss";

class Home extends React.Component {
  // Get data for previous messages and friends with their online status
  componentDidMount = () => {
    const { socketConn } = this.props;
    if (!!getUserData() && !socketConn) {
      this.initiateSocketConn();
      this.nebulaCloudGenerator();
    }
  };

  componentDidUpdate = () => {
    const { socketConn } = this.props;
    const isLoggedIn = !!getUserData();
    if (isLoggedIn) {
      // !socketConn && this.initiateSocketConn();
    } else {
      clearUserData();
      window.location.href = "/auth";
    }
  };

  initiateSocketConn = () => {
    const socket = io(Endpoints.CHAT_URL);
    const userData = getUserData();
    userData &&
      socket.on("connect", () => {
        socket.emit("i_have_joined", userData._id);
        this.bindSocketListeners(socket);
        this.fetchInitialData(socket);
        this.props.preserveSocketConn(socket);
      });
    // else reconnect cycle............
  };

  bindSocketListeners = socket => {
    socket.on("message", this.props.updateMessagesList);
    socket.on("friends_update", this.props.updateFriendsList);
    socket.on("error", error => {
      console.log("----------------- SOCKET ERROR ----------------");
      console.error(error);
    });
    window.addEventListener("beforeunload", function() {
      socket.close();
    });
  };

  fetchInitialData = () => {
    const userData = getUserData();
    if (!userData) {
      return;
    }
    this.props.tryFetchingAllFriends();
    this.props.tryFetchingAllMessages({ id: userData._id });
  };

  sendMessage = messageData => {
    const { socketConn } = this.props;
    socketConn.emit("message", messageData, data => {
      this.props.updateMessagesList(data);
    });
  };

  getMessageData = (friend, messages) => {
    let pasrsedList = [];
    if (messages && friend) {
      pasrsedList = messages[friend._id] || [];
      pasrsedList = pasrsedList.map(msg => {
        msg.timestamp = moment(msg.timestamp);
        return msg;
      });
      return pasrsedList.sort((x, y) => x.timestamp.diff(y.timestamp) > 0);
    }
    return pasrsedList;
  };

  nebulaCloudGenerator() {
    let scene,
      camera,
      cloudParticles = [],
      composer,
      renderer,
      cloudGeo,
      cloudMaterial;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 1;
      camera.rotation.x = 1.16;
      camera.rotation.y = -0.12;
      camera.rotation.z = 0.27;

      let ambient = new THREE.AmbientLight(0x555555);
      scene.add(ambient);

      let directionalLight = new THREE.DirectionalLight(0xff8c19);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);

      let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
      orangeLight.position.set(200, 300, 100);
      scene.add(orangeLight);
      let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
      redLight.position.set(100, 300, 100);
      scene.add(redLight);
      let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
      blueLight.position.set(300, 300, 200);
      scene.add(blueLight);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene.fog = new THREE.FogExp2(0x03544e, 0.001);
      renderer.setClearColor(scene.fog.color);
      document.body.appendChild(renderer.domElement);

      let loader = new THREE.TextureLoader();
      loader.load(SmokeImage, function(texture) {
        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });

        for (let p = 0; p < 50; p++) {
          let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 500
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 2 * Math.PI;
          cloud.material.opacity = 0.55;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      });
      loader.load(StarsImage, function(texture) {
        const textureEffect = new POSTPROCESSING.TextureEffect({
          blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
          texture: texture
        });
        textureEffect.blendMode.opacity.value = 0.2;

        const bloomEffect = new POSTPROCESSING.BloomEffect({
          blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
          kernelSize: POSTPROCESSING.KernelSize.SMALL,
          useLuminanceFilter: true,
          luminanceThreshold: 0.3,
          luminanceSmoothing: 0.75
        });
        bloomEffect.blendMode.opacity.value = 1.5;

        let effectPass = new POSTPROCESSING.EffectPass(
          camera,
          bloomEffect,
          textureEffect
        );
        effectPass.renderToScreen = true;

        composer = new POSTPROCESSING.EffectComposer(renderer);
        composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
        composer.addPass(effectPass);

        window.addEventListener("resize", onWindowResize, false);
        render();
      });
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function render() {
      cloudParticles.forEach(p => {
        p.rotation.z -= 0.001;
      });
      composer.render(0.1);
      requestAnimationFrame(render);
    }

    init();
  }

  render() {
    const {
      friends,
      messages,
      activeFriend,
      unseenMessages,
      changeActiveFriend,
      tryLoggingOut
    } = this.props;
    const messageData = this.getMessageData(activeFriend, messages.data);

    return (
      <div className="view__container home__container">
        <div className="view__container--inner">
          <div className="view__body">
            <div className="sidebar__container">
              <div className="sidebar__content">
                <SidebarHeader />
                <FriendsList
                  data={friends.data}
                  activeFriend={activeFriend}
                  status={friends.status}
                  changeActiveFriend={changeActiveFriend}
                  unseenMessages={unseenMessages}
                />
                <SidebarFooter tryLoggingOut={tryLoggingOut} />
              </div>
            </div>
            <div className="content__container">
              {activeFriend && (
                <ChatBox
                  data={messageData}
                  friend={activeFriend}
                  status={messages.status}
                  sendMessage={this.sendMessage}
                />
              )}
            </div>
            <div className="sidebar__container">
              <div className="sidebar__content"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.home
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    preserveSocketConn: bindActionCreators(preserveSocketConn, dispatch),
    updateFriendsList: bindActionCreators(updateFriendsList, dispatch),
    updateMessagesList: bindActionCreators(updateMessagesList, dispatch),
    changeActiveFriend: bindActionCreators(changeActiveFriend, dispatch),
    tryFetchingAllFriends: bindActionCreators(tryFetchingAllFriends, dispatch),
    tryFetchingAllMessages: bindActionCreators(tryFetchingAllMessages, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
