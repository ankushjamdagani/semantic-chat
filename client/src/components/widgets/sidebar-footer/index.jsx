import React from "react";
import "./styles.scss";

class SidebarFooter extends React.Component {
  render() {
    return (
      <div className="widget__container sidebar-footer__container">
        <div className="widget__container-inner">
          <div className="widget__body sidebar-footer__body">
            <div className="footer-control__container">
              <div className="footer-control__group">
                <div className="footer-control__item tc-grey-2">
                  <i className="fas fa-cogs"></i>
                </div>
                <div className="footer-control__item tc-grey-2">
                  <i className="fas fa-adjust"></i>
                </div>
              </div>
              <div className="footer-control__group">
                <div className="footer-control__item tc-grey-2">
                  <i className="fas fa-sign-out-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SidebarFooter;
