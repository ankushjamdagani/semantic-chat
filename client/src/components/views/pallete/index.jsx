import React from "react";
import "./styles.scss";

class Pallete extends React.Component {
  render() {
    return (
      <div className="view__container pallete__container">
        <div className="pallete__item--1">
          <div className="palette__item__label">$Black</div>
          <div className="palette__item__label">#000000</div>
        </div>
        <div className="pallete__item--2">
          <div className="palette__item__label">$BlackForContrast</div>
          <div className="palette__item__label">#2c2c2c</div>
        </div>
        <div className="pallete__item--3">
          <div className="palette__item__label">$DarkGrey</div>
          <div className="palette__item__label">#262626</div>
        </div>
        <div className="pallete__item--4">
          <div className="palette__item__label">$Grey</div>
          <div className="palette__item__label">#3f3f3f</div>
        </div>
        <div className="pallete__item--5">
          <div className="palette__item__label">$LightGrey</div>
          <div className="palette__item__label">#dcdcdc</div>
        </div>
        <div className="pallete__item--6">
          <div className="palette__item__label">$Whitish</div>
          <div className="palette__item__label">#f5f5f5</div>
        </div>
        <div className="pallete__item--7">
          <div className="palette__item__label">$White</div>
          <div className="palette__item__label">#ffffff</div>
        </div>
        <div className="pallete__item--8">
          <div className="palette__item__label">$Red</div>
          <div className="palette__item__label">#c1432e</div>
        </div>
        <div className="pallete__item--9">
          <div className="palette__item__label">$Silver</div>
          <div className="palette__item__label">#4b6777</div>
        </div>
        <div className="pallete__item--10">
          <div className="palette__item__label">$Gold</div>
          <div className="palette__item__label">#ce9e62</div>
        </div>
      </div>
    );
  }
}

export default Pallete;
