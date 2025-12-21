import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreateDeliveryRequestMutationVariables = Types.Exact<{
  orderId: Types.Scalars['ID']['input'];
  price: Types.Scalars['Float']['input'];
  travelAt: Types.Scalars['ISO8601DateTime']['input'];
  userId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  clientMutationId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreateDeliveryRequestMutation = { __typename?: 'Mutation', createDeliveryRequest?: { __typename?: 'DeliveryRequest', id: string, price: number, status: string, travelAt: any, active: boolean, createdAt: any, updatedAt: any, order: { __typename?: 'Order', id: string, number?: string, title?: string }, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, mobile?: string, email?: string } } };


export const CreateDeliveryRequestDocument = gql`
    mutation createDeliveryRequest($orderId: ID!, $price: Float!, $travelAt: ISO8601DateTime!, $userId: ID, $clientMutationId: String) {
  createDeliveryRequest(
    input: {orderId: $orderId, price: $price, travelAt: $travelAt, userId: $userId, clientMutationId: $clientMutationId}
  ) {
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
export type CreateDeliveryRequestMutationFn = ApolloReactCommon.MutationFunction<CreateDeliveryRequestMutation, CreateDeliveryRequestMutationVariables>;

/**
 * __useCreateDeliveryRequestMutation__
 *
 * To run a mutation, you first call `useCreateDeliveryRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliveryRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliveryRequestMutation, { data, loading, error }] = useCreateDeliveryRequestMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      price: // value for 'price'
 *      travelAt: // value for 'travelAt'
 *      userId: // value for 'userId'
 *      clientMutationId: // value for 'clientMutationId'
 *   },
 * });
 */
export function useCreateDeliveryRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDeliveryRequestMutation, CreateDeliveryRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDeliveryRequestMutation, CreateDeliveryRequestMutationVariables>(CreateDeliveryRequestDocument, options);
      }
export type CreateDeliveryRequestMutationHookResult = ReturnType<typeof useCreateDeliveryRequestMutation>;
export type CreateDeliveryRequestMutationResult = ApolloReactCommon.MutationResult<CreateDeliveryRequestMutation>;
export type CreateDeliveryRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDeliveryRequestMutation, CreateDeliveryRequestMutationVariables>;