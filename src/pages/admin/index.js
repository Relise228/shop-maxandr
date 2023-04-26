import Layout from '@components/Layout';
import { useSession } from 'next-auth/react';

const AdminPage = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      Only admin (email is mlysenko0601@gmail.com or andreysmit43@gmail.com) can
      see this page. The user is {session?.user?.email}, {session?.user?.name}
    </Layout>
  );
};

export default AdminPage;
