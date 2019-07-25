import React from 'react';

export const CreateCompanyModalContext = React.createContext({
  open: false,
  showModal: () => {},
  hideModal: () => {},
});
