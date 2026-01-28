import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import { OrderFragmentFragmentDoc } from '../fragments/order.generated';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CloseOrderMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
  status?: Types.InputMaybe<Types.Scalars['String']['input']>;
  comment?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CloseOrderMutation = { __typename?: 'Mutation', closeOrder?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, packageType?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, images?: Array<string>, subscribed: boolean, createdAt: any, updatedAt: any, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } };


export const CloseOrderDocument = gql`
    mutation CloseOrder($number: String!, $status: String, $comment: String) {
  closeOrder(input: {number: $number, status: $status, comment: $comment}) {
    ...OrderFragment
  }
}
    ${OrderFragmentFragmentDoc}`;
export type CloseOrderMutationFn = ApolloReactCommon.MutationFunction<CloseOrderMutation, CloseOrderMutationVariables>;

/**
 * __useCloseOrderMutation__
 *
 * To run a mutation, you first call `useCloseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeOrderMutation, { data, loading, error }] = useCloseOrderMutation({
 *   variables: {
 *      number: // value for 'number'
 *      status: // value for 'status'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCloseOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloseOrderMutation, CloseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CloseOrderMutation, CloseOrderMutationVariables>(CloseOrderDocument, options);
      }
export type CloseOrderMutationHookResult = ReturnType<typeof useCloseOrderMutation>;
export type CloseOrderMutationResult = ApolloReactCommon.MutationResult<CloseOrderMutation>;
export type CloseOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CloseOrderMutation, CloseOrderMutationVariables>;