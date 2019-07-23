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
  return async (values, { setSubmitting }) => {
    console.log('VALS', values);
    try {
      const result = await mutation({
        // Reinstate when mutation is in place on backend
        variables: {
          data: {
            fromDate: new Date(),
            person: {
              connect: {
                id: user.person.id,
              },
            },
            organization: {
              connect: {
                id: values.organizationID,
              },
            },

            metadata: {
              create: defaultCreateAffiliationMetadata,
            },
          },
        },
      });
      setSubmitting(false);
      handleClose();
      navigate('/app/profile/');
    } catch (error) {
      console.log(error);
    }
  };
}
