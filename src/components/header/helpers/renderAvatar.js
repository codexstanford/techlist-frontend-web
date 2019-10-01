import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { navigate } from '@reach/router';
import PersonIcon from '@material-ui/icons/Person';

function renderAvatar(user) {
  const { person } = user;
  const { avatar, name } = person;

  if (avatar && avatar.length > 0) {
    const [userAvatar, ...rest] = avatar;
    return (
      <Avatar
        src={userAvatar.payload}
        onClick={() => navigate('/app/profile/')}
        style={{ marginLeft: 10 }}
        imgProps={{
          style: { maxWidth: '100%', maxHeight: '100%' },
        }}
      />
    );
  } else if (name && name.length > 0) {
    const [userName, ...rest] = name;
    const { firstName, lastName } = userName;
    return (
      <Avatar
        onClick={() => navigate('/app/profile/')}
        style={{ marginLeft: 10 }}
        imgProps={{
          style: { maxWidth: '100%', maxHeight: '100%' },
        }}
      >
        {`${firstName[0] + lastName[0]}`}
      </Avatar>
    );
  }
  return (
    <Avatar
      onClick={() => navigate('/app/profile/')}
      style={{ marginLeft: 10 }}
      imgProps={{
        style: { maxWidth: '100%', maxHeight: '100%' },
      }}
    >
      <PersonIcon />
    </Avatar>
  );
}

export default renderAvatar;
