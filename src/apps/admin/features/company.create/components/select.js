import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField } from 'formik-material-ui';
import styled from 'styled-components';

const organizationLinkType = [
  { type: 'UrlPrivacyPolicy', niceName: 'Privacy Policy' },
  { type: 'UrlSupport', niceName: 'Support' },
  { type: 'UrlSales', niceName: 'Sales' },
  { type: 'UrlTermsOfService', niceName: 'TOS' },
  { type: 'UrlTwitter', niceName: 'Twitter' },
  { type: 'UrlLinkedIn', niceName: 'LinkedIn' },
  { type: 'UrlFacebook', niceName: 'Facebook' },
  { type: 'UrlCrunchbase', niceName: 'Crunchbase' },
  { type: 'UrlAngellist', niceName: 'Angellist' },
  { type: 'UrlWebsite', niceName: 'Website' },
  { type: 'EmailSales', niceName: 'Sales Email' },
  { type: 'EmailSupport', niceName: 'Support Email' },
  { type: 'Other', niceName: 'Other' },
];

export default function SimpleSelect({
  classes,
  field,
  form,
  values,
  styles,
  label = 'Link Type',
  options = organizationLinkType,
}) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <StyledFormControl className={classes.formControl} style={styles}>
      <InputLabel ref={inputLabel} htmlFor={field.name}>
        {label}
      </InputLabel>
      <Select
        inputProps={field}
        input={
          <Input labelwidth={labelWidth} name={field.name} id={field.name} />
        }
      >
        {options.map(item => {
          return (
            <MenuItem key={item.type} value={item.type}>
              {item.niceName}{' '}
            </MenuItem>
          );
        })}
      </Select>
    </StyledFormControl>
  );
}

const StyledFormControl = styled(FormControl)`
  padding-right: 1rem;
  min-width: 175px;
  margin-top: 15px;
`;
