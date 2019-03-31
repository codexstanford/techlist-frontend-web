import React from 'react';
import GoogleMapReact from 'google-map-react';

import { Container } from '../../atoms';

function CompanyLocationMap(props) {
  console.log(props);
  if (!props.location.geometry || !props.location.geometry.set) {
    return null;
  }
  const { location } = props.location.geometry.set;

  return (
    <Container style={{ height: '150px' }}>
      <GoogleMapReact id="test" defaultZoom={8} defaultCenter={location}>
        <Marker {...location} />
      </GoogleMapReact>
    </Container>
  );
}

export default CompanyLocationMap;

import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...(props.onClick ? { onClick: props.onClick } : {})}
  />
);
