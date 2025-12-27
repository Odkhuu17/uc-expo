import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AttachOrderVideoMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
  video: Types.Scalars['Upload']['input'];
}>;


export type AttachOrderVideoMutation = { __typename?: 'Mutation', attachOrderVideo?: { __typename?: 'Order', id: string, number?: string, video?: string } };


export const AttachOrderVideoDocument = gql`
    mutation AttachOrderVideo($number: String!, $video: Upload!) {
  attachOrderVideo(input: {number: $number, video: $video}) {
    id
    number
    video
  }
}
    `;
export type AttachOrderVideoMutationFn = ApolloReactCommon.MutationFunction<AttachOrderVideoMutation, AttachOrderVideoMutationVariables>;

/**
 * __useAttachOrderVideoMutation__
 *
 * To run a mutation, you first call `useAttachOrderVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachOrderVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachOrderVideoMutation, { data, loading, error }] = useAttachOrderVideoMutation({
 *   variables: {
 *      number: // value for 'number'
 *      video: // value for 'video'
 *   },
 * });
 */
export function useAttachOrderVideoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttachOrderVideoMutation, AttachOrderVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AttachOrderVideoMutation, AttachOrderVideoMutationVariables>(AttachOrderVideoDocument, options);
      }
export type AttachOrderVideoMutationHookResult = ReturnType<typeof useAttachOrderVideoMutation>;
export type AttachOrderVideoMutationResult = ApolloReactCommon.MutationResult<AttachOrderVideoMutation>;
export type AttachOrderVideoMutationOptions = ApolloReactCommon.BaseMutationOptions<AttachOrderVideoMutation, AttachOrderVideoMutationVariables>;