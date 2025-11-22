import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CheckPaymentMutationVariables = Types.Exact<{
  invoiceNo: Types.Scalars['ID']['input'];
}>;


export type CheckPaymentMutation = { __typename?: 'Mutation', checkPayment?: any };


export const CheckPaymentDocument = gql`
    mutation checkPayment($invoiceNo: ID!) {
  checkPayment(input: {invoiceNo: $invoiceNo})
}
    `;
export type CheckPaymentMutationFn = ApolloReactCommon.MutationFunction<CheckPaymentMutation, CheckPaymentMutationVariables>;

/**
 * __useCheckPaymentMutation__
 *
 * To run a mutation, you first call `useCheckPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkPaymentMutation, { data, loading, error }] = useCheckPaymentMutation({
 *   variables: {
 *      invoiceNo: // value for 'invoiceNo'
 *   },
 * });
 */
export function useCheckPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CheckPaymentMutation, CheckPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CheckPaymentMutation, CheckPaymentMutationVariables>(CheckPaymentDocument, options);
      }
export type CheckPaymentMutationHookResult = ReturnType<typeof useCheckPaymentMutation>;
export type CheckPaymentMutationResult = ApolloReactCommon.MutationResult<CheckPaymentMutation>;
export type CheckPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CheckPaymentMutation, CheckPaymentMutationVariables>;