import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyOrderAudioMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
}>;


export type DestroyOrderAudioMutation = { __typename?: 'Mutation', destroyOrderAudio?: { __typename?: 'Order', id: string, audio?: string } };


export const DestroyOrderAudioDocument = gql`
    mutation DestroyOrderAudio($number: String!) {
  destroyOrderAudio(input: {number: $number}) {
    id
    audio
  }
}
    `;
export type DestroyOrderAudioMutationFn = ApolloReactCommon.MutationFunction<DestroyOrderAudioMutation, DestroyOrderAudioMutationVariables>;

/**
 * __useDestroyOrderAudioMutation__
 *
 * To run a mutation, you first call `useDestroyOrderAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyOrderAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyOrderAudioMutation, { data, loading, error }] = useDestroyOrderAudioMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useDestroyOrderAudioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyOrderAudioMutation, DestroyOrderAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyOrderAudioMutation, DestroyOrderAudioMutationVariables>(DestroyOrderAudioDocument, options);
      }
export type DestroyOrderAudioMutationHookResult = ReturnType<typeof useDestroyOrderAudioMutation>;
export type DestroyOrderAudioMutationResult = ApolloReactCommon.MutationResult<DestroyOrderAudioMutation>;
export type DestroyOrderAudioMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyOrderAudioMutation, DestroyOrderAudioMutationVariables>;