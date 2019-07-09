export function getInitialValues(props) {
  return {
    yearFounded: new Date().toISOString().split('T')[0],
    description: '',
    locationjson: {},
    targetMarkets: '',
    logo: '',
    links: [
      { type: 'UrlWebsite', payload: '' },
      { type: 'UrlTwitter', payload: '' },
      { type: 'UrlCrunchbase', payload: '' },
    ],
  };
}
