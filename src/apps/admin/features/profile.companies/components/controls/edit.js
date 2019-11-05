import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditCompany from '../../../../components/company.edit';

export class EditCompanyControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  toggleEditing = value => {
    this.setState({ isEditing: value });
  };

  render() {
    const { company, ...props } = this.props;

    return (
      <>
        <IconButton onClick={() => this.toggleEditing(!this.state.isEditing)}>
          <EditIcon />
        </IconButton>
        <EditCompany
          company={company}
          isEditing={this.state.isEditing}
          toggleEditing={this.toggleEditing}
        />
      </>
    );
  }
}
