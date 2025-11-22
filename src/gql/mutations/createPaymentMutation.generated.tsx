import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreatePaymentMutationVariables = Types.Exact<{
  action: Types.PaymentMethodEnum;
  subscriptionPlanId: Types.Scalars['ID']['input'];
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment?: any };


export const CreatePaymentDocument = gql`
    mutation createPayment($action: PaymentMethodEnum!, $subscriptionPlanId: ID!) {
  createPayment(input: {action: $action, subscriptionPlanId: $subscriptionPlanId})
}
    `;
export type CreatePaymentMutationFn = ApolloReactCommon.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      action: // value for 'action'
 *      subscriptionPlanId: // value for 'subscriptionPlanId'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = ApolloReactCommon.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;