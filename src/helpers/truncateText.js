import React, { Component } from 'react';
import callAll from './callAll';
import styled from 'styled-components';

let spacingToRemove = 3;

class TruncateText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show || false,
      ending: props.ending || null,
    };
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  defaultEnding = () => {
    return {
      truncated: <DefaultButton onClick={this.toggleShow}>...</DefaultButton>,
      expanded: (
        <ExpandedButton onClick={this.toggleShow}>see less</ExpandedButton>
      ),
    };
  };

  componentDidMount() {
    if (this.state.ending === null) {
      this.setState({ ending: this.defaultEnding() });
    }
  }

  render() {
    const { str, length } = this.props;
    const { show } = this.state;

    if (length === null) {
      length = 150;
    }

    if (this.state.ending !== null) {
      const { truncated, expanded } = this.state.ending;

      let finalTruncated = truncated;
      let finalExpanded = expanded;

      if (truncated && expanded) {
        switch (typeof finalTruncated) {
          case 'string':
            spacingToRemove = finalTruncated.length;
            finalTruncated = (
              <DefaultButton show={show} onClick={this.toggleShow}>
                {finalTruncated}
              </DefaultButton>
            );
            break;
          case 'object':
            spacingToRemove = finalTruncated.props.children.length;
            finalTruncated = React.cloneElement(finalTruncated, {
              onClick: finalTruncated.props.onClick
                ? () => callAll(finalTruncated.props.onClick(), this.toggleShow)
                : this.toggleShow,
              style: {
                ...finalTruncated.props.style,
                display: 'inline-block',
                cursor: 'pointer',
              },
            });
            break;
        }

        switch (typeof expanded) {
          case 'string':
            finalExpanded = (
              <ExpandedButton onClick={this.toggleShow}>
                {finalExpanded}
              </ExpandedButton>
            );
            break;
          case 'object':
            finalExpanded = React.cloneElement(finalExpanded, {
              onClick: finalExpanded.props.onClick
                ? () => callAll(finalExpanded.props.onClick(), this.toggleShow)
                : this.toggleShow,
              style: {
                ...finalExpanded.props.style,
                display: 'inline-block',
                cursor: 'pointer',
              },
            });
            break;
        }
      }

      if (str.length <= length) {
        return <p>{str.substring(0)}</p>;
      } else if (show) {
        return (
          <>
            {str.substring(0)}
            {this.state.ending.expanded}
          </>
        );
      } else if (!show && str.length > length) {
        return (
          <>
            {str.substring(0, length - spacingToRemove).trim()}
            {this.state.ending.truncated}
          </>
        );
      }
    } else {
      return null;
    }
  }
}

const DefaultButton = styled.button`
  display: inline-block;
  border: none;
  background-color: inherit;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  color: gray;
  outline: none;
`;

const ExpandedButton = styled(DefaultButton)`
  padding: 0 5px;
`;

TruncateText.defaultProps = {
  length: null,
  ending: null,
};

export default TruncateText;
