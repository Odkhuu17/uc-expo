import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AttachOrderImageMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
  images: Array<Types.Scalars['Upload']['input']> | Types.Scalars['Upload']['input'];
}>;


export type AttachOrderImageMutation = { __typename?: 'Mutation', attachOrderImage?: { __typename?: 'Order', id: string, number?: string, images?: Array<string>, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }> } };


export const AttachOrderImageDocument = gql`
    mutation AttachOrderImage($number: String!, $images: [Upload!]!) {
  attachOrderImage(input: {number: $number, images: $images}) {
    id
    number
    images
    imageObjects {
      id
      url
      fileName
      recordId
      recordType
    }
  }
}
    `;
export type AttachOrderImageMutationFn = ApolloReactCommon.MutationFunction<AttachOrderImageMutation, AttachOrderImageMutationVariables>;

/**
 * __useAttachOrderImageMutation__
 *
 * To run a mutation, you first call `useAttachOrderImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttachOrderImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attachOrderImageMutation, { data, loading, error }] = useAttachOrderImageMutation({
 *   variables: {
 *      number: // value for 'number'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useAttachOrderImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttachOrderImageMutation, AttachOrderImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AttachOrderImageMutation, AttachOrderImageMutationVariables>(AttachOrderImageDocument, options);
      }
export type AttachOrderImageMutationHookResult = ReturnType<typeof useAttachOrderImageMutation>;
export type AttachOrderImageMutationResult = ApolloReactCommon.MutationResult<AttachOrderImageMutation>;
export type AttachOrderImageMutationOptions = ApolloReactCommon.BaseMutationOptions<AttachOrderImageMutation, AttachOrderImageMutationVariables>;