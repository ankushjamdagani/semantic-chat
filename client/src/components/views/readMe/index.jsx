import React from 'react';
import * as mdFile from './README.md';
import './styles.scss';

class ReadMe extends React.Component {
  render() {
    return (
      <div className="view__container read-me__container">
        <div className="view__content">
          <div dangerouslySetInnerHTML={{ __html: mdFile }}></div>
        </div>
      </div>
    )
  }
}

export default ReadMe;