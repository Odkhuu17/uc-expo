import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AuthCheckTokenMutationVariables = Types.Exact<{
  login: Types.Scalars['String']['input'];
  token: Types.Scalars['String']['input'];
  clientMutationId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AuthCheckTokenMutation = { __typename?: 'Mutation', valid: boolean };


export const AuthCheckTokenDocument = gql`
    mutation authCheckToken($login: String!, $token: String!, $clientMutationId: String) {
  valid: authCheckToken(
    input: {login: $login, token: $token, clientMutationId: $clientMutationId}
  )
}
    `;
export type AuthCheckTokenMutationFn = ApolloReactCommon.MutationFunction<AuthCheckTokenMutation, AuthCheckTokenMutationVariables>;

/**
 * __useAuthCheckTokenMutation__
 *
 * To run a mutation, you first call `useAuthCheckTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthCheckTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authCheckTokenMutation, { data, loading, error }] = useAuthCheckTokenMutation({
 *   variables: {
 *      login: // value for 'login'
 *      token: // value for 'token'
 *      clientMutationId: // value for 'clientMutationId'
 *   },
 * });
 */
export function useAuthCheckTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthCheckTokenMutation, AuthCheckTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AuthCheckTokenMutation, AuthCheckTokenMutationVariables>(AuthCheckTokenDocument, options);
      }
export type AuthCheckTokenMutationHookResult = ReturnType<typeof useAuthCheckTokenMutation>;
export type AuthCheckTokenMutationResult = ApolloReactCommon.MutationResult<AuthCheckTokenMutation>;
export type AuthCheckTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthCheckTokenMutation, AuthCheckTokenMutationVariables>;