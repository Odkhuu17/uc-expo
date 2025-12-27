import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AttachOrderAudioMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
  audio: Types.Scalars['Upload']['input'];
}>;


export type AttachOrderAudioMutation = { __typename?: 'Mutation', attachOrderAudio?: { __typename?: 'Order', id: string, number?: string, audio?: string } };


export const AttachOrderAudioDocument = gql`
    mutation AttachOrderAudio($number: String!, $audio: Upload!) {
  attachOrderAudio(input: {number: $number, audio: $audio}) {
    id
    number
    audio
  }
}
    `;
export type AttachOrderAudioMutationFn = ApolloReactCommon.MutationFunction<AttachOrderAudioMutation, AttachOrderAudioMutationVariables>;

/**
 * __useAttachOrderAudioMutation__
 *
 * To run a mutation, you first call `useAttachOrderAudioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachOrderAudioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachOrderAudioMutation, { data, loading, error }] = useAttachOrderAudioMutation({
 *   variables: {
 *      number: // value for 'number'
 *      audio: // value for 'audio'
 *   },
 * });
 */
export function useAttachOrderAudioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttachOrderAudioMutation, AttachOrderAudioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AttachOrderAudioMutation, AttachOrderAudioMutationVariables>(AttachOrderAudioDocument, options);
      }
export type AttachOrderAudioMutationHookResult = ReturnType<typeof useAttachOrderAudioMutation>;
export type AttachOrderAudioMutationResult = ApolloReactCommon.MutationResult<AttachOrderAudioMutation>;
export type AttachOrderAudioMutationOptions = ApolloReactCommon.BaseMutationOptions<AttachOrderAudioMutation, AttachOrderAudioMutationVariables>;