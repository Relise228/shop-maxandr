import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const SigninPage = () => {
  const router = useRouter();
  const { status } = useSession();
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('google');
    } else if (status === 'authenticated') {
      router.push(router.query.callbackUrl || '/');
    }
  }, [status]);

  return <p>Redirecting...</p>;
};

export default SigninPage;
