import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreateSubscriptionMutationVariables = Types.Exact<{
  truckId: Types.Scalars['ID']['input'];
  subscriptionPlanId: Types.Scalars['ID']['input'];
  userId: Types.Scalars['ID']['input'];
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription?: { __typename?: 'Subscription', id: string, payments: Array<{ __typename?: 'Payment', id: string }> } };


export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($truckId: ID!, $subscriptionPlanId: ID!, $userId: ID!) {
  createSubscription(
    input: {truckId: $truckId, subscriptionPlanId: $subscriptionPlanId, userId: $userId}
  ) {
    id
    payments {
      id
    }
  }
}
    `;
export type CreateSubscriptionMutationFn = ApolloReactCommon.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      truckId: // value for 'truckId'
 *      subscriptionPlanId: // value for 'subscriptionPlanId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = ApolloReactCommon.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;