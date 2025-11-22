import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DestroyOrderMutation = { __typename?: 'Mutation', destroyOrder?: { __typename?: 'Order', id: string } };


export const DestroyOrderDocument = gql`
    mutation destroyOrder($id: ID!) {
  destroyOrder(input: {id: $id}) {
    id
  }
}
    `;
export type DestroyOrderMutationFn = ApolloReactCommon.MutationFunction<DestroyOrderMutation, DestroyOrderMutationVariables>;

/**
 * __useDestroyOrderMutation__
 *
 * To run a mutation, you first call `useDestroyOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyOrderMutation, { data, loading, error }] = useDestroyOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyOrderMutation, DestroyOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyOrderMutation, DestroyOrderMutationVariables>(DestroyOrderDocument, options);
      }
export type DestroyOrderMutationHookResult = ReturnType<typeof useDestroyOrderMutation>;
export type DestroyOrderMutationResult = ApolloReactCommon.MutationResult<DestroyOrderMutation>;
export type DestroyOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyOrderMutation, DestroyOrderMutationVariables>;