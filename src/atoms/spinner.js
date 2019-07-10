import React from 'react';
import { css } from 'styled-components';
import { BounceLoader as ClipLoader } from 'react-spinners';

import styled from 'styled-components';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <Container className="sweet-loading">
        <ClipLoader
          sizeUnit={'px'}
          size={150}
          color={'#ffffff'}
          loading={this.state.loading}
        />
      </Container>
    );
  }
}

export default AwesomeComponent;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b1040e;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
