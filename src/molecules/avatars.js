import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';

import { HiddenFileInput } from '../atoms';

export const AvatarWithPicker = props => {
  const { setFieldValue, setImage, image } = props;
  return (
    <React.Fragment>
      <HiddenFileInput
        onChange={e => {
          e.stopPropagation();
          e.preventDefault();
          console.log(e.target.files);

          const fileReader = new FileReader();
          fileReader.onloadend = e => {
            const content = fileReader.result;
            setFieldValue('logo', content);
            setImage(content);
          };
          if (e.target.files.length > 0) {
            fileReader.readAsDataURL(e.target.files[0]);
          }
        }}
      />
      <label htmlFor="avatar">
        <Fab
          style={{
            margin: 10,
            width: 120,
            height: 120,
          }}
        >
          <label htmlFor="avatar">
            <Avatar
              style={{ width: 120, height: 120 }}
              src={image}
              imgProps={{
                style: { maxWidth: '100%', maxHeight: '100%' },
              }}
            />
          </label>
        </Fab>
      </label>
    </React.Fragment>
  );
};
