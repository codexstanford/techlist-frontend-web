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
    <InputContainer>
      <InputWrapper>
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
        <InputLabel htmlFor="avatar">
          <StyledFab>
            <label htmlFor="avatar">
              <Avatar
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '5px',
                }}
                src={values.logo}
                imgProps={{
                  style: {
                    maxWidth: '100%',
                    maxHeight: '100%',
                  },
                }}
              />
            </label>
          </StyledFab>
        </InputLabel>
      </InputWrapper>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  min-width: 99%;
  max-width: 100%;
`;

const InputWrapper = styled(InputContainer)`
  display: flex;
  justify-content: flex-start;
`;

const InputLabel = styled.label`
  display: flex;
  justify-content: center;
  min-width: 99%;
`;

const StyledFab = styled(Fab)`
  margin: 10px;
  min-width: 50%;
  max-width: 50%;
  max-height: 200px;
  min-height: 200px;
  border-radius: 5px;

  @media (max-width: 620px) {
    max-height: 175px;
    min-height: 175px;
  }

  @media (max-width: 560px) {
    max-height: 150px;
    min-height: 150px;
  }
`;

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
