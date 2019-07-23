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
  handleBlur,
  values,
  ...rest
}) {
  return (
    <InputContainer>
      <StyledInput
        name="logo"
        onBlur={handleBlur}
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
      <InputLabel htmlFor="logo">
        <StyledFab>
          <label htmlFor="logo">
            <Avatar
              style={{
                minWidth: 250,
                minHeight: 200,
                borderRadius: '5px',
                padding: 10,
              }}
              src={values.logo}
              imgProps={{
                style: {
                  height: '100%',
                  objectFit: 'contain',
                },
              }}
            />
          </label>
        </StyledFab>
      </InputLabel>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: 100%;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  min-width: 250px;
`;

const StyledFab = styled(Fab)`
  min-width: 250px;
  min-height: 200px;
  border-radius: 5px;
`;

const StyledInput = styled.input.attrs({
  type: 'file',
  id: 'logo',
  accept: 'image/*',
})`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
