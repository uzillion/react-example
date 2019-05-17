import React from 'react';
import './FancyDiv.css';

class FancyDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="fd">
        <h2>{this.props.name}</h2>
        {this.props.children}
      </div>
    )
  }
}

export default FancyDiv;
