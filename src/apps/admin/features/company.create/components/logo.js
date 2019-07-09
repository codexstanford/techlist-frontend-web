import React from 'react';
import CodeXTextField from '../../../components/codex.textinput';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

export function Logo({
  errors,
  touched,
  classes,
  setImage,
  setFieldValue,
  values,
  ...rest
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <StyledInput
          name="logo"
          onChange={e => {
            e.stopPropagation();
            e.preventDefault();

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
              width: 400,
              height: 300,
              borderRadius: '5px',
            }}
          >
            <label htmlFor="avatar">
              <Avatar
                style={{
                  width: 400,
                  height: 300,
                  borderRadius: '5px',
                }}
                src={values.logo}
                imgProps={{
                  style: {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 400,
                    height: 300,
                  },
                }}
              />
            </label>
          </Fab>
        </label>
      </div>
    </div>
  );
}

const StyledInput = styled.input.attrs({
  type: 'file',
  id: 'avatar',
  accept: 'image/*',
})`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
