import { navigate } from '@reach/router';

const defaultCreateAffiliationMetadata = {
  isDraft: true,
  isPublic: false,
  isUnverified: false,
  isApproved: false,
  isPendingReview: false,
};

export function handleCreateAffiliation(props) {
  const { mutation, user, handleClose, ...rest } = props;
  return async ({}, { setSubmitting }) => {
    try {
      // const result = await mutation({ // Reinstate when mutation is in place on backend
      //   variables: {
      //     data: {
      //       affiliation: {
      //         create: {
      //           fromDate: new Date(),
      //           person: {
      //             connect: {
      //               id: user.person.id,
      //             },
      //           },
      //         },
      //       },
      //       metadata: {
      //         create: defaultCreateAffiliationMetadata,
      //       },
      //     },
      //   },
      // });
      setSubmitting(false);
      handleClose();
      navigate('/app/profile/');
    } catch (error) {
      console.log(error);
    }
  };
}
