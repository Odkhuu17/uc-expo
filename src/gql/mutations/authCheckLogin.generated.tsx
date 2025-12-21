import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AuthCheckLoginMutationVariables = Types.Exact<{
  login: Types.Scalars['String']['input'];
  sendToken?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  clientMutationId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AuthCheckLoginMutation = { __typename?: 'Mutation', exists: any };


export const AuthCheckLoginDocument = gql`
    mutation authCheckLogin($login: String!, $sendToken: Boolean, $clientMutationId: String) {
  exists: authCheckLogin(
    input: {login: $login, sendToken: $sendToken, clientMutationId: $clientMutationId}
  )
}
    `;
export type AuthCheckLoginMutationFn = ApolloReactCommon.MutationFunction<AuthCheckLoginMutation, AuthCheckLoginMutationVariables>;

/**
 * __useAuthCheckLoginMutation__
 *
 * To run a mutation, you first call `useAuthCheckLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthCheckLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authCheckLoginMutation, { data, loading, error }] = useAuthCheckLoginMutation({
 *   variables: {
 *      login: // value for 'login'
 *      sendToken: // value for 'sendToken'
 *      clientMutationId: // value for 'clientMutationId'
 *   },
 * });
 */
export function useAuthCheckLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthCheckLoginMutation, AuthCheckLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AuthCheckLoginMutation, AuthCheckLoginMutationVariables>(AuthCheckLoginDocument, options);
      }
export type AuthCheckLoginMutationHookResult = ReturnType<typeof useAuthCheckLoginMutation>;
export type AuthCheckLoginMutationResult = ApolloReactCommon.MutationResult<AuthCheckLoginMutation>;
export type AuthCheckLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthCheckLoginMutation, AuthCheckLoginMutationVariables>;