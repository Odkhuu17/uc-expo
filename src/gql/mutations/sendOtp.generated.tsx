import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type SendOtpMutationVariables = Types.Exact<{
  login: Types.Scalars['String']['input'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp?: { __typename?: 'User', id: string } };


export const SendOtpDocument = gql`
    mutation SendOtp($login: String!) {
  sendOtp(input: {login: $login}) {
    id
  }
}
    `;
export type SendOtpMutationFn = ApolloReactCommon.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = ApolloReactCommon.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = ApolloReactCommon.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;