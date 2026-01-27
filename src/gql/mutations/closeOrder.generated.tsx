import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CloseOrderMutationVariables = Types.Exact<{
  mobile: Types.Scalars['String']['input'];
  number: Types.Scalars['String']['input'];
}>;


export type CloseOrderMutation = { __typename?: 'Mutation', closeOrder?: { __typename?: 'Order', id: string, number?: string, status?: string } };


export const CloseOrderDocument = gql`
    mutation CloseOrder($mobile: String!, $number: String!) {
  closeOrder(input: {mobile: $mobile, number: $number}) {
    id
    number
    status
  }
}
    `;
export type CloseOrderMutationFn = ApolloReactCommon.MutationFunction<CloseOrderMutation, CloseOrderMutationVariables>;

/**
 * __useCloseOrderMutation__
 *
 * To run a mutation, you first call `useCloseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeOrderMutation, { data, loading, error }] = useCloseOrderMutation({
 *   variables: {
 *      mobile: // value for 'mobile'
 *      number: // value for 'number'
 *   },
 * });
 */
export function useCloseOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloseOrderMutation, CloseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CloseOrderMutation, CloseOrderMutationVariables>(CloseOrderDocument, options);
      }
export type CloseOrderMutationHookResult = ReturnType<typeof useCloseOrderMutation>;
export type CloseOrderMutationResult = ApolloReactCommon.MutationResult<CloseOrderMutation>;
export type CloseOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CloseOrderMutation, CloseOrderMutationVariables>;