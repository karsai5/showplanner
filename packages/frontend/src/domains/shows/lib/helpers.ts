import { useRouter } from 'next/router';
import Session from 'supertokens-auth-react/recipe/session';

export const useShowSlugFromUrl = () => {
  const {
    query: { slug },
  } = useRouter();
  return slug as string;
};

export const useSession = () => {
  const session = Session.useSessionContext();
  if (session.loading) {
    throw new Error('Tried to access session while it was loading');
  }
  return session;
};
