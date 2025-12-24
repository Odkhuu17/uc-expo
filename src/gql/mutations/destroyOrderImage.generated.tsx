import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyOrderImageMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
  imageId: Types.Scalars['ID']['input'];
}>;


export type DestroyOrderImageMutation = { __typename?: 'Mutation', destroyOrderImage?: { __typename?: 'Order', id: string, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }> } };


export const DestroyOrderImageDocument = gql`
    mutation DestroyOrderImage($number: String!, $imageId: ID!) {
  destroyOrderImage(input: {number: $number, imageId: $imageId}) {
    id
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
export type DestroyOrderImageMutationFn = ApolloReactCommon.MutationFunction<DestroyOrderImageMutation, DestroyOrderImageMutationVariables>;

/**
 * __useDestroyOrderImageMutation__
 *
 * To run a mutation, you first call `useDestroyOrderImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyOrderImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyOrderImageMutation, { data, loading, error }] = useDestroyOrderImageMutation({
 *   variables: {
 *      number: // value for 'number'
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useDestroyOrderImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyOrderImageMutation, DestroyOrderImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyOrderImageMutation, DestroyOrderImageMutationVariables>(DestroyOrderImageDocument, options);
      }
export type DestroyOrderImageMutationHookResult = ReturnType<typeof useDestroyOrderImageMutation>;
export type DestroyOrderImageMutationResult = ApolloReactCommon.MutationResult<DestroyOrderImageMutation>;
export type DestroyOrderImageMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyOrderImageMutation, DestroyOrderImageMutationVariables>;