import { steps } from '../../../../helpers/enums';

export const handleCompanySubmitRequest = ({
  userId,
  personId,
  createCompany,
  setStep,
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
    }).then(data => {
      setStep(steps.TERMS);
    });
  } catch (err) {
    console.log(err);
  }
};
