import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DestroyTruckMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DestroyTruckMutation = { __typename?: 'Mutation', destroyTruck?: { __typename?: 'Truck', id: string, plateNumber?: string, serial?: string, weight?: number, netWeight?: number, importedDate?: any, manufacturedDate?: any, createdAt: any, updatedAt: any } };


export const DestroyTruckDocument = gql`
    mutation DestroyTruck($id: ID!) {
  destroyTruck(input: {id: $id}) {
    id
    plateNumber
    serial
    weight
    netWeight
    importedDate
    manufacturedDate
    createdAt
    updatedAt
  }
}
    `;
export type DestroyTruckMutationFn = ApolloReactCommon.MutationFunction<DestroyTruckMutation, DestroyTruckMutationVariables>;

/**
 * __useDestroyTruckMutation__
 *
 * To run a mutation, you first call `useDestroyTruckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyTruckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyTruckMutation, { data, loading, error }] = useDestroyTruckMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDestroyTruckMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DestroyTruckMutation, DestroyTruckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DestroyTruckMutation, DestroyTruckMutationVariables>(DestroyTruckDocument, options);
      }
export type DestroyTruckMutationHookResult = ReturnType<typeof useDestroyTruckMutation>;
export type DestroyTruckMutationResult = ApolloReactCommon.MutationResult<DestroyTruckMutation>;
export type DestroyTruckMutationOptions = ApolloReactCommon.BaseMutationOptions<DestroyTruckMutation, DestroyTruckMutationVariables>;