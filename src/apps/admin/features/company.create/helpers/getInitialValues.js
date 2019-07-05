export function getInitialValues(props) {
  return {
    yearFounded: new Date().toISOString().split('T')[0],
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
