import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyTaxonMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DestroyTaxonMutation = { __typename?: 'Mutation', destroyTaxon?: { __typename?: 'Taxon', id: string } };


export const DestroyTaxonDocument = gql`
    mutation DestroyTaxon($id: ID!) {
  destroyTaxon(input: {id: $id}) {
    id
  }
}
    `;
export type DestroyTaxonMutationFn = ApolloReactCommon.MutationFunction<DestroyTaxonMutation, DestroyTaxonMutationVariables>;

/**
 * __useDestroyTaxonMutation__
 *
 * To run a mutation, you first call `useDestroyTaxonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyTaxonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyTaxonMutation, { data, loading, error }] = useDestroyTaxonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyTaxonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyTaxonMutation, DestroyTaxonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyTaxonMutation, DestroyTaxonMutationVariables>(DestroyTaxonDocument, options);
      }
export type DestroyTaxonMutationHookResult = ReturnType<typeof useDestroyTaxonMutation>;
export type DestroyTaxonMutationResult = ApolloReactCommon.MutationResult<DestroyTaxonMutation>;
export type DestroyTaxonMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyTaxonMutation, DestroyTaxonMutationVariables>;