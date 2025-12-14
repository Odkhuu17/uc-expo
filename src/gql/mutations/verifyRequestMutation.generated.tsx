import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type VerifyRequestMutationVariables = Types.Exact<{
  targetId: Types.Scalars['ID']['input'];
  kind: Types.Scalars['String']['input'];
  images: Array<Types.Scalars['Upload']['input']> | Types.Scalars['Upload']['input'];
}>;


export type VerifyRequestMutation = { __typename?: 'Mutation', verifyRequest?: { __typename?: 'Verification', id: string, status: string, targetId: string, targetType: string, comment?: string, field1?: string, field2?: string, field3?: string, field4?: string, field5?: string, userId: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, respondedBy?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string } } };


export const VerifyRequestDocument = gql`
    mutation VerifyRequest($targetId: ID!, $kind: String!, $images: [Upload!]!) {
  verifyRequest(input: {targetId: $targetId, kind: $kind, images: $images}) {
    id
    status
    targetId
    targetType
    comment
    field1
    field2
    field3
    field4
    field5
    userId
    user {
      id
      firstName
      lastName
      nickName
      mobile
      email
    }
    respondedBy {
      id
      firstName
      lastName
      nickName
      mobile
      email
    }
    createdAt
    updatedAt
  }
}
    `;
export type VerifyRequestMutationFn = ApolloReactCommon.MutationFunction<VerifyRequestMutation, VerifyRequestMutationVariables>;

/**
 * __useVerifyRequestMutation__
 *
 * To run a mutation, you first call `useVerifyRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyRequestMutation, { data, loading, error }] = useVerifyRequestMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *      kind: // value for 'kind'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useVerifyRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyRequestMutation, VerifyRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyRequestMutation, VerifyRequestMutationVariables>(VerifyRequestDocument, options);
      }
export type VerifyRequestMutationHookResult = ReturnType<typeof useVerifyRequestMutation>;
export type VerifyRequestMutationResult = ApolloReactCommon.MutationResult<VerifyRequestMutation>;
export type VerifyRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyRequestMutation, VerifyRequestMutationVariables>;