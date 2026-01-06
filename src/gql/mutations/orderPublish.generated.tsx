import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type PublishOrderMutationVariables = Types.Exact<{
  input: Types.PublishOrderInput;
}>;


export type PublishOrderMutation = { __typename?: 'Mutation', publishOrder?: { __typename?: 'Order', id: string } };


export const PublishOrderDocument = gql`
    mutation PublishOrder($input: publishOrderInput!) {
  publishOrder(input: $input) {
    id
  }
}
    `;
export type PublishOrderMutationFn = ApolloReactCommon.MutationFunction<PublishOrderMutation, PublishOrderMutationVariables>;

/**
 * __usePublishOrderMutation__
 *
 * To run a mutation, you first call `usePublishOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishOrderMutation, { data, loading, error }] = usePublishOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublishOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishOrderMutation, PublishOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PublishOrderMutation, PublishOrderMutationVariables>(PublishOrderDocument, options);
      }
export type PublishOrderMutationHookResult = ReturnType<typeof usePublishOrderMutation>;
export type PublishOrderMutationResult = ApolloReactCommon.MutationResult<PublishOrderMutation>;
export type PublishOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishOrderMutation, PublishOrderMutationVariables>;