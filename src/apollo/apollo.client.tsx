import { ApolloClient, InMemoryCache, ServerError } from '@apollo/client';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { ApolloProvider } from '@apollo/client/react';
import { Observable } from '@apollo/client/utilities';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
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
        console.log('uregferugeiewm');

        error.errors.forEach(({ message, extensions }) =>
          router.navigate({
            pathname: '/modal',
            params: { type: 'error', message },
          })
        );
      } else if (ServerError.is(error) && error.statusCode !== 401) {
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
              console.log('refreshed token:', newToken);
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
              console.log('123123123');
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

    const uploadLink = new UploadHttpLink({
      uri: process.env.EXPO_PUBLIC_API_URL,
      isExtractableFile: (
        value: any
      ): value is { uri: string; name: string; type: string } => {
        return (
          value != null &&
          typeof value === 'object' &&
          typeof value.uri === 'string' &&
          typeof value.name === 'string' &&
          typeof value.type === 'string'
        );
      },
      formDataAppendFile: (
        formData: FormData,
        fieldName: string,
        file: any
      ) => {
        formData.append(fieldName, {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any);
      },
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
      .concat(uploadLink);

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
