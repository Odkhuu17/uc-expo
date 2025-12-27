import { ApolloProvider } from '@apollo/client/react';
import { ReactNode } from 'react';

import useClient from './useClient';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  const client = useClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
