import React, { Component } from 'react';
import { withTheme } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditAffiliation from '../../../../components/affiliation.edit';

class EditAffiliationControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  toggleEditing = () => {
    this.setState(prevstate => ({ isEditing: !prevstate.isEditing }));
  };

  render() {
    const { affiliation, theme } = this.props;
    const { isEditing } = this.state;
    return (
      <>
        <IconButton
          size="small"
          onClick={this.toggleEditing}
          style={{ margin: theme.spacing(0.5) }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <EditAffiliation
          affiliation={affiliation}
          isEditing={isEditing}
          toggleEditing={this.toggleEditing}
        />
      </>
    );
  }
}

export default withTheme(EditAffiliationControl);
