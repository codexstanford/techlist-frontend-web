export const handleCompanySubmitRequest = ({
  userId,
  personId,
  createCompany,
}) => async (values, { setSubmitting }) => {
  setSubmitting(true);
  const {
    dateStarted,
    emailSales,
    emailSupport,
    role,
    name,
    dateFounded,
    description,
    twitter,
    crunchbase,
    angellist,
    logo,
    location,
  } = values;

  try {
    const profile = await createCompany({
      variables: {
        where: {
          id: userId,
        },
        data: {
          person: {
            update: {
              affiliations: {
                create: [
                  {
                    startDate: dateStarted,
                    role,
                    company: {
                      create: {
                        name,
                        yearFounded: dateFounded,
                        description,
                        twitter,
                        crunchbase,
                        angellist,
                        logo,
                        affiliations: {
                          connect: [{ id: personId }],
                        },
                        contact: {
                          create: {
                            emailSales,
                            emailSupport,
                            urlTwitter: twitter,
                            urlCrunchbase: crunchbase,
                            urlAngellist: angellist,
                          },
                        },
                        admins: {
                          connect: {
                            id: userId,
                          },
                        },
                        metadata: {
                          create: {
                            isDraft: true,
                            isPublic: false,
                            isVerified: false,
                            isApproved: false,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    });

    setSubmitting(false);
    setStep(3);
  } catch (err) {
    console.log(err);
  }
};
