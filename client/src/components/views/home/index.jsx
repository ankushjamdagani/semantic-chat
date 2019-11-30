import React from "react";
import "./styles.scss";

import { ChatBox } from "__COMPONENTS/widgets";

class Home extends React.Component {
  render() {
    return (
      <div className="view__container home__container">
        <div className="view__body row">
          <div className="col-xs-4"></div>
          <div className="col-xs-4">
            <ChatBox />
          </div>
          <div className="col-xs-4"></div>
        </div>
      </div>
    );
  }
}

export default Home;
