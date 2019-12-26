import React from "react";
import { getUserData, clearUserData } from "__SERVICES/auth";
import "./styles.scss";

class SidebarHeader extends React.Component {
  state = {
    userData: getUserData()
  };
  render() {
    const { userData } = this.state;
    return (
      <div className="widget__container sidebar-header__container">
        <div className="widget__container-inner">
          <div className="widget__body sidebar-header__body">
            <div className="user-info__container">
              <div className="user-info__body">
                <div className="user__thumb ts-h3 tw-heavy">{userData.username[0]}</div>
                <div className="user__name ts-md">{userData.username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SidebarHeader;
