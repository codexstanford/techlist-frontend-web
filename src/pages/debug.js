import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { Confirm } from '../atoms/confirm';

const NotFoundPage = () => {
  const [shouldOpen, setOpen] = React.useState(false);

  return (
    <Layout>
      <SEO title="404: Not found" />
      <Confirm
        cancelText="No way!"
        confirmText="You got it!"
        direction="left"
        onCancel={() => {
          console.log('Request Canceled');
        }}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log('Request Confirmed');
        }}
        open={shouldOpen}
      />
      <button onClick={() => setOpen(!shouldOpen)}>toggle</button>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
