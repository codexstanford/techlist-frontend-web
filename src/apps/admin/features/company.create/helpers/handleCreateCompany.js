const defaultCreateCompanyMetadata = {
  isDraft: true,
  isPublic: false,
  isUnverified: false,
  isApproved: false,
  isPendingReview: false,
};

export function handleCreateCompany(props) {
  const { mutation, ...rest } = props;
  return async (
    {
      name,
      description,
      location,
      locationjson,
      links,
      targetMarkets,
      categories,
    },
    { setSubmitting }
  ) => {
    const { formatted_address, geometry, place_id } = locationjson;

    try {
      const result = await createCompany({
        variables: {
          data: {
            categories: {
              connect: categories.map(cat => ({ id: cat.value })),
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
            metadata: {
              create: defaultCreateCompanyMetadata,
            },
          },
        },
      });
      setSubmitting(false);
      navigate('/app/profile/');
    } catch (error) {
      console.log(error);
    }
  };
}
