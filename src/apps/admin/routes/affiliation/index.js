import React from 'react';
import CreateAffiliation from '../../features/afffiliation.create';
import { useUser } from '../../../../store/user-context';

function CreateAffiliationScreen({
  classes,
  navigate,
  open,
  onCancel,
  initialCompany,
  ...rest
}) {
  const { data } = useUser();
  const { user } = data;

  return (
    <CreateAffiliation
      classes={classes}
      user={user}
      handleClose={() => onCancel(!open)}
      open={open}
      initialCompany={initialCompany}
    />
  );
}

export default CreateAffiliationScreen;
