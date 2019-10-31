import React from 'react';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

import { renderAffiliation } from './helpers';

export default function AffiliationsListController({
  affiliations,
  first,
  second,
  rest,
  refetch,
  ...props
}) {
  if (affiliations) {
    return (
      <>
        {first &&
          renderAffiliation({
            affiliation: first,
            refetch,
            hasDivider: false,
          })}
        {second &&
          renderAffiliation({
            affiliation: second,
            refetch,
            hasDivider: false,
          })}
        {rest && rest.length > 0 ? (
          <StyledExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} />
            <ExpansionPanelDetails>
              <StyledList>
                {rest.map(affiliation =>
                  renderAffiliation({ affiliation, refetch })
                )}
              </StyledList>
            </ExpansionPanelDetails>
          </StyledExpansionPanel>
        ) : null}
      </>
    );
  }
}

const StyledList = styled(List)`
  width: 100%;
  backgroundcolor: white;
`;

const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: none;
  width: 100%;
`;
