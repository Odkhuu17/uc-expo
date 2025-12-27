import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type VerifyTruckMutationVariables = Types.Exact<{
  passport: Types.Scalars['Upload']['input'];
  truckId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type VerifyTruckMutation = { __typename?: 'Mutation', verifyTruck?: { __typename?: 'Verification', id: string, status: string, field5?: string } };


export const VerifyTruckDocument = gql`
    mutation VerifyTruck($passport: Upload!, $truckId: ID) {
  verifyTruck(input: {passport: $passport, truckId: $truckId}) {
    id
    status
    field5
  }
}
    `;
export type VerifyTruckMutationFn = ApolloReactCommon.MutationFunction<VerifyTruckMutation, VerifyTruckMutationVariables>;

/**
 * __useVerifyTruckMutation__
 *
 * To run a mutation, you first call `useVerifyTruckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTruckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTruckMutation, { data, loading, error }] = useVerifyTruckMutation({
 *   variables: {
 *      passport: // value for 'passport'
 *      truckId: // value for 'truckId'
 *   },
 * });
 */
export function useVerifyTruckMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyTruckMutation, VerifyTruckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyTruckMutation, VerifyTruckMutationVariables>(VerifyTruckDocument, options);
      }
export type VerifyTruckMutationHookResult = ReturnType<typeof useVerifyTruckMutation>;
export type VerifyTruckMutationResult = ApolloReactCommon.MutationResult<VerifyTruckMutation>;
export type VerifyTruckMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyTruckMutation, VerifyTruckMutationVariables>;