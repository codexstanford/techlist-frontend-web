import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import CreateCompanyScreen from '../apps/admin/routes/company';
import { useUser } from './user-context';
import withStyles from '@material-ui/core/styles/withStyles';

import { styles } from '../apps/admin/config/styles';
import { CreateCompanyModalContext } from './modal-context';

export const UseModal = withStyles(styles)(({ modal, ...props }) => {
  const { open, hideModal } = useContext(CreateCompanyModalContext);
  const { data } = useUser();
  const { user } = data;

  switch (modal) {
    case 'createCompany':
      return ReactDOM.createPortal(
        <CreateCompanyScreen
          user={user}
          classes={props.classes}
          open={open}
          onCancel={hideModal}
        />,
        document.body
      );

    default:
      return null;
  }
});
