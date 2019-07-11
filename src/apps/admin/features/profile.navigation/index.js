import React from 'react';
import MobileNav from './components/mobile';
import DesktopNav from './components/desktop';
import Media from 'react-media';

// TODO: extend or trash mobile nav.

function ProfileNav(props) {
  return (
    <Media query={{ minWidth: 600 }}>
      {matches =>
        matches ? <DesktopNav {...props} /> : <DesktopNav {...props} />
      }
    </Media>
  );
}

export default ProfileNav;
