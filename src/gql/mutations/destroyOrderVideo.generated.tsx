import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyOrderVideoMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
}>;


export type DestroyOrderVideoMutation = { __typename?: 'Mutation', destroyOrderVideo?: { __typename?: 'Order', id: string, video?: string } };


export const DestroyOrderVideoDocument = gql`
    mutation DestroyOrderVideo($number: String!) {
  destroyOrderVideo(input: {number: $number}) {
    id
    video
  }
}
    `;
export type DestroyOrderVideoMutationFn = ApolloReactCommon.MutationFunction<DestroyOrderVideoMutation, DestroyOrderVideoMutationVariables>;

/**
 * __useDestroyOrderVideoMutation__
 *
 * To run a mutation, you first call `useDestroyOrderVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyOrderVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyOrderVideoMutation, { data, loading, error }] = useDestroyOrderVideoMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useDestroyOrderVideoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyOrderVideoMutation, DestroyOrderVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyOrderVideoMutation, DestroyOrderVideoMutationVariables>(DestroyOrderVideoDocument, options);
      }
export type DestroyOrderVideoMutationHookResult = ReturnType<typeof useDestroyOrderVideoMutation>;
export type DestroyOrderVideoMutationResult = ApolloReactCommon.MutationResult<DestroyOrderVideoMutation>;
export type DestroyOrderVideoMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyOrderVideoMutation, DestroyOrderVideoMutationVariables>;