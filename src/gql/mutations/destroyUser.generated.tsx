import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyUserMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DestroyUserMutation = { __typename?: 'Mutation', destroyUser?: { __typename?: 'User', id: string } };


export const DestroyUserDocument = gql`
    mutation DestroyUser($id: ID!) {
  destroyUser(input: {id: $id}) {
    id
  }
}
    `;
export type DestroyUserMutationFn = ApolloReactCommon.MutationFunction<DestroyUserMutation, DestroyUserMutationVariables>;

/**
 * __useDestroyUserMutation__
 *
 * To run a mutation, you first call `useDestroyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyUserMutation, { data, loading, error }] = useDestroyUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyUserMutation, DestroyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyUserMutation, DestroyUserMutationVariables>(DestroyUserDocument, options);
      }
export type DestroyUserMutationHookResult = ReturnType<typeof useDestroyUserMutation>;
export type DestroyUserMutationResult = ApolloReactCommon.MutationResult<DestroyUserMutation>;
export type DestroyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyUserMutation, DestroyUserMutationVariables>;