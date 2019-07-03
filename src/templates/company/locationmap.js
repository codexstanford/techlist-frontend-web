import React from 'react';
import GoogleMapReact from 'google-map-react';

import { Container } from '../../atoms';

export function CompanyLocationMap(props) {
  let location = null;

  if (props.location && props.location.geometry) {
    location = props.location.geometry.set.location;
  }

  return location === null ? null : (
    <Container style={{ height: '350px' }}>
      <GoogleMapReact id="test" defaultZoom={8} defaultCenter={location}>
        <Marker {...location} />
      </GoogleMapReact>
    </Container>
  );
}

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
