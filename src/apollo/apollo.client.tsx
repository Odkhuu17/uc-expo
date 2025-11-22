import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { ApolloProvider } from '@apollo/client/react';
import { Observable } from '@apollo/client/utilities';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { ReactNode, useMemo } from 'react';

import { refreshAccessToken } from '@/services/auth/auth.service';

export const useCreateApolloClient = () => {
  const router = useRouter();

  return useMemo(() => {
    const authLink = new SetContextLink(async (prevContext, operation) => {
      const token = await SecureStore.getItemAsync('accessToken');

      return {
        headers: {
          ...prevContext.headers,
          authorization: token
            ? `Bearer ${token}`
            : `Bearer ${process.env.EXPO_PUBLIC_JWT}`,
        },
      };
    });

    const errorLink = new ErrorLink(({ error, operation }) => {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) => {
          return router.navigate({
            pathname: '/modal',
            params: { type: 'error', message },
          });
        });
      } else if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) =>
          router.navigate({
            pathname: '/modal',
            params: { type: 'error', message },
          })
        );
      } else {
        return router.navigate({
          pathname: '/modal',
          params: { type: 'error', message: error.message },
        });
      }
    });

    const resetToken = new ErrorLink(({ error, operation, forward }) => {
      if (ServerError.is(error) && error.statusCode === 401) {
        return new Observable(observer => {
          refreshAccessToken()
            .then(newToken => {
              // Update the operation context with the new token
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  authorization: `Bearer ${newToken}`,
                },
              }));

              // Retry the operation with the new token
              const subscription = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });

              return () => subscription.unsubscribe();
            })
            .catch(refreshError => {
              // If refresh fails, clear tokens and redirect to login
              SecureStore.deleteItemAsync('accessToken');
              SecureStore.deleteItemAsync('refreshToken');
              router.replace('/auth/login');
              observer.error(refreshError);
            });
        });
      }

      // Return undefined for non-401 errors to let other error handlers process them
      return;
    });

    const httpLink = new HttpLink({
      uri: process.env.EXPO_PUBLIC_API_URL,
    });

    const retryLink = new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
      },
      attempts: {
        max: 2,
        retryIf: (error, _operation) => {
          // Only retry on network errors, not on 401 (handled by resetToken link)
          return !!error && !ServerError.is(error);
        },
      },
    });

    const authFlowLink = authLink
      .concat(resetToken)
      .concat(errorLink)
      .concat(retryLink)
      .concat(httpLink);

    return new ApolloClient({
      link: authFlowLink,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
        },
      },
    });
  }, []);
};

// Simple Apollo Provider Component that creates client inside React
interface ApolloClientProviderProps {
  children: ReactNode;
}

export const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({
  children,
}) => {
  const client = useCreateApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
