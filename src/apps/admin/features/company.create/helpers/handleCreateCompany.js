import { navigate } from '@reach/router';

const defaultCreateCompanyMetadata = {
  isDraft: true,
  isPublic: false,
  isUnverified: false,
  isApproved: false,
  isPendingReview: false,
};

export function handleCreateCompany(props) {
  const { mutation, user, handleClose, ...rest } = props;
  return async (
    {
      name,
      description,
      yearFounded,
      location,
      locationjson,
      links,
      logo,
      targetMarkets,
      categories,
    },
    { setSubmitting }
  ) => {
    const { formatted_address, geometry, place_id } = locationjson;

    try {
      const result = await mutation({
        variables: {
          data: {
            categories: {
              connect: categories && categories.map(cat => ({ id: cat.value })),
            },
            logo: {
              create: {
                payload: logo,
                fromDate: new Date(),
                isPrimary: true,
                isPublic: true,
                isDefault: true,
              },
            },
            name: {
              create: {
                payload: name,
                fromDate: new Date(),
              },
            },
            targetMarkets: {
              connect: {
                id: targetMarkets,
              },
            },
            description,
            yearFounded,
            location: {
              create: {
                formatted_address,
                geometry,
                placeId: place_id,
              },
            },
            links: {
              create: links.map(link => {
                return {
                  fromDate: new Date(),
                  payload: link.payload,
                  type: link.type,
                };
              }),
            },
            affiliation: {
              create: {
                fromDate: new Date(),
                person: {
                  connect: {
                    id: user.person.id,
                  },
                },
              },
            },
            admins: {
              connect: {
                id: user.id,
              },
            },
            metadata: {
              create: defaultCreateCompanyMetadata,
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
