import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type OrderDestroyMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type OrderDestroyMutation = { __typename?: 'Mutation', destroyOrder?: { __typename?: 'Order', id: string } };


export const OrderDestroyDocument = gql`
    mutation orderDestroy($id: ID!) {
  destroyOrder(input: {id: $id}) {
    id
  }
}
    `;
export type OrderDestroyMutationFn = ApolloReactCommon.MutationFunction<OrderDestroyMutation, OrderDestroyMutationVariables>;

/**
 * __useOrderDestroyMutation__
 *
 * To run a mutation, you first call `useOrderDestroyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderDestroyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderDestroyMutation, { data, loading, error }] = useOrderDestroyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderDestroyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OrderDestroyMutation, OrderDestroyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<OrderDestroyMutation, OrderDestroyMutationVariables>(OrderDestroyDocument, options);
      }
export type OrderDestroyMutationHookResult = ReturnType<typeof useOrderDestroyMutation>;
export type OrderDestroyMutationResult = ApolloReactCommon.MutationResult<OrderDestroyMutation>;
export type OrderDestroyMutationOptions = ApolloReactCommon.BaseMutationOptions<OrderDestroyMutation, OrderDestroyMutationVariables>;