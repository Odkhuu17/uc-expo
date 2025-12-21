import { ApolloClient, InMemoryCache, ServerError } from '@apollo/client';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { Observable } from '@apollo/client/utilities';
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs';
import { useMemo } from 'react';
import * as Keychain from 'react-native-keychain';
import { Buffer } from 'buffer';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';

import { refreshAccessToken } from './helpers';
import constants from '@/constants';
import { INavigation } from '@/navigations';
import { useAppDispatch } from '@/redux/hooks';
import authSlice from '@/redux/slices/auth';

const useClient = () => {
  const navigation = useNavigation<INavigation>();
  const dispatch = useAppDispatch();

  return useMemo(() => {
    const authLink = new SetContextLink(async (prevContext, operation) => {
      const credentials = await Keychain.getGenericPassword({
        service: constants.keyChainAuthServiceKey,
      });

      const authHeader = await Buffer.from(
        `${Config.OAUTH_CLIENT_ID}:${Config.OAUTH_CLIENT_SECRET}`,
      ).toString('base64');

      return {
        headers: {
          ...prevContext.headers,
          authorization: credentials
            ? `Bearer ${credentials.password}`
            : `Basic ${authHeader}`,
        },
      };
    });

    const errorLink = new ErrorLink(({ error, operation }) => {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) => {
          return navigation.navigate('MsgModal', {
            type: 'error',
            msg: message,
          });
        });
      } else if (CombinedProtocolErrors.is(error)) {
        console.log('uregferugeiewm');

        error.errors.forEach(({ message, extensions }) =>
          navigation.navigate('MsgModal', {
            type: 'error',
            msg: message,
          }),
        );
      } else if (ServerError.is(error) && error.statusCode !== 401) {
        return navigation.navigate('MsgModal', {
          type: 'error',
          msg: error.message,
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
            .catch(async refreshError => {
              console.log('123123123');
              // If refresh fails, clear tokens and redirect to login
              await Keychain.resetGenericPassword({
                service: constants.keyChainAuthServiceKey,
              });
              observer.error(refreshError);
              dispatch(authSlice.actions.logout());
            });
        });
      }

      // Return undefined for non-401 errors to let other error handlers process them
      return;
    });

    const uploadLink = new UploadHttpLink({
      uri: `${Config.API_URL}/graphql`,
      isExtractableFile: (
        value: any,
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
        file: any,
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

export default useClient;
