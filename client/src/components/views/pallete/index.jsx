import React from "react";
import "./styles.scss";

class Pallete extends React.Component {
  render() {
    return (
      <div className="view__container pallete__container">
        <div className="pallete__item--1">
          <div className="palette__item__label">$Grey0</div>
          <div className="palette__item__label">#000</div>
        </div>
        <div className="pallete__item--2">
          <div className="palette__item__label">$Grey1</div>
          <div className="palette__item__label">#2c2c2c</div>
        </div>
        <div className="pallete__item--3">
          <div className="palette__item__label">$Grey2</div>
          <div className="palette__item__label">#3f3f3f</div>
        </div>
        <div className="pallete__item--4">
          <div className="palette__item__label">$Grey3</div>
          <div className="palette__item__label">#dcdcdc</div>
        </div>
        <div className="pallete__item--5">
          <div className="palette__item__label">$Grey4</div>
          <div className="palette__item__label">#f5f5f5</div>
        </div>
        <div className="pallete__item--6">
          <div className="palette__item__label">$Grey5</div>
          <div className="palette__item__label">#fafafa</div>
        </div>
        <div className="pallete__item--13">
          <div className="palette__item__label">$Color6</div>
          <div className="palette__item__label">#55ae95</div>
        </div>
        <div className="pallete__item--7">
          <div className="palette__item__label">$Color0</div>
          <div className="palette__item__label">#f8b195</div>
        </div>
        <div className="pallete__item--8">
          <div className="palette__item__label">$Color1</div>
          <div className="palette__item__label">#f67280</div>
        </div>
        <div className="pallete__item--9">
          <div className="palette__item__label">$Color2</div>
          <div className="palette__item__label">#c06c84</div>
        </div>
        <div className="pallete__item--10">
          <div className="palette__item__label">$Color3</div>
          <div className="palette__item__label">#6c5b7b</div>
        </div>
        <div className="pallete__item--11">
          <div className="palette__item__label">$Color4</div>
          <div className="palette__item__label">#272343</div>
        </div>
        <div className="pallete__item--12">
          <div className="palette__item__label">$Color5</div>
          <div className="palette__item__label">#2d132c</div>
        </div>
        <div className="pallete__item--14">
          <div className="palette__item__label">$Color7</div>
          <div className="palette__item__label">#00909e</div>
        </div>
      </div>
    );
  }
}

export default Pallete;
