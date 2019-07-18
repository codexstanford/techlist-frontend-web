import { getUser } from './auth-client';

async function bootstrapAppData({ client }) {
  const data = await getUser(client);
  if (!data) {
    return { user: null };
  }
  const { me } = data;
  return {
    user: me,
  };
}

export { bootstrapAppData };
