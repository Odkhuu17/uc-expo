import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AcceptDeliveryRequestMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  clientMutationId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AcceptDeliveryRequestMutation = { __typename?: 'Mutation', acceptDeliveryRequest?: { __typename?: 'DeliveryRequest', id: string, price: string, status: string, travelAt?: any, active: boolean, createdAt: any, updatedAt: any, order: { __typename?: 'Order', id: string, number?: string, title?: string }, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, mobile?: string, email?: string } } };


export const AcceptDeliveryRequestDocument = gql`
    mutation acceptDeliveryRequest($id: ID!, $clientMutationId: String) {
  acceptDeliveryRequest(input: {id: $id, clientMutationId: $clientMutationId}) {
    id
    price
    status
    travelAt
    active
    order {
      id
      number
      title
    }
    user {
      id
      firstName
      lastName
      mobile
      email
    }
    createdAt
    updatedAt
  }
}
    `;
export type AcceptDeliveryRequestMutationFn = ApolloReactCommon.MutationFunction<AcceptDeliveryRequestMutation, AcceptDeliveryRequestMutationVariables>;

/**
 * __useAcceptDeliveryRequestMutation__
 *
 * To run a mutation, you first call `useAcceptDeliveryRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptDeliveryRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptDeliveryRequestMutation, { data, loading, error }] = useAcceptDeliveryRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      clientMutationId: // value for 'clientMutationId'
 *   },
 * });
 */
export function useAcceptDeliveryRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptDeliveryRequestMutation, AcceptDeliveryRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AcceptDeliveryRequestMutation, AcceptDeliveryRequestMutationVariables>(AcceptDeliveryRequestDocument, options);
      }
export type AcceptDeliveryRequestMutationHookResult = ReturnType<typeof useAcceptDeliveryRequestMutation>;
export type AcceptDeliveryRequestMutationResult = ApolloReactCommon.MutationResult<AcceptDeliveryRequestMutation>;
export type AcceptDeliveryRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptDeliveryRequestMutation, AcceptDeliveryRequestMutationVariables>;