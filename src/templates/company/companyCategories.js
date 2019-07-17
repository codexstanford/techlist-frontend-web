import React from 'react';
import Chip from '@material-ui/core/Chip';
import { formatCategoryName } from './helpers';

export const CompanyCategories = ({ company, wrapper, chip, ...props }) => {
  const Wrapper = wrapper;

  if (company.categories !== undefined) {
    if (company.categories.length > 0) {
      return company.categories.map(item => {
        return chip ? (
          <Chip
            color="primary"
            key={item.label ? item.value : item.id}
            label={formatCategoryName(item.label ? item.label : item.payload)}
            style={{ margin: 2 }}
            {...props}
          />
        ) : (
          <Wrapper key={item.label ? item.value : item.id}>
            <span style={{ whiteSpace: 'nowrap' }}>
              {formatCategoryName(item.label ? item.label : item.payload)}
            </span>
          </Wrapper>
        );
      });
    } else {
      return null;
    }
  } else {
    return null;
  }
};

CompanyCategories.defaultProps = {
  wrapper: 'div',
};
