import { getUser } from './auth-client';

async function bootstrapAppData() {
  const data = await getUser();
  if (!data) {
    return { user: null };
  }
  const { me } = data;
  return {
    user: me,
  };
}

export { bootstrapAppData };
