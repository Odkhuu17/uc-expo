import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreateTruckMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  plateNumber?: Types.InputMaybe<Types.Scalars['String']['input']>;
  serial?: Types.InputMaybe<Types.Scalars['String']['input']>;
  weight?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  netWeight?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  importedDate?: Types.InputMaybe<Types.Scalars['ISO8601DateTime']['input']>;
  manufacturedDate?: Types.InputMaybe<Types.Scalars['ISO8601DateTime']['input']>;
  taxonId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type CreateTruckMutation = { __typename?: 'Mutation', createTruck?: { __typename?: 'Truck', id: string, plateNumber?: string, serial?: string, weight?: number, netWeight?: number, importedDate?: any, manufacturedDate?: any, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email?: string, firstName?: string, lastName?: string }, currentTrack?: { __typename?: 'TruckTrack', id: string, latitude?: number, longitude?: number, createdAt: any } } };


export const CreateTruckDocument = gql`
    mutation createTruck($userId: ID!, $plateNumber: String, $serial: String, $weight: Int, $netWeight: Int, $importedDate: ISO8601DateTime, $manufacturedDate: ISO8601DateTime, $taxonId: ID) {
  createTruck(
    input: {userId: $userId, plateNumber: $plateNumber, serial: $serial, weight: $weight, netWeight: $netWeight, importedDate: $importedDate, manufacturedDate: $manufacturedDate, taxonId: $taxonId}
  ) {
    id
    plateNumber
    serial
    weight
    netWeight
    importedDate
    manufacturedDate
    user {
      id
      email
      firstName
      lastName
    }
    currentTrack {
      id
      latitude
      longitude
      createdAt
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateTruckMutationFn = ApolloReactCommon.MutationFunction<CreateTruckMutation, CreateTruckMutationVariables>;

/**
 * __useCreateTruckMutation__
 *
 * To run a mutation, you first call `useCreateTruckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTruckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTruckMutation, { data, loading, error }] = useCreateTruckMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      plateNumber: // value for 'plateNumber'
 *      serial: // value for 'serial'
 *      weight: // value for 'weight'
 *      netWeight: // value for 'netWeight'
 *      importedDate: // value for 'importedDate'
 *      manufacturedDate: // value for 'manufacturedDate'
 *      taxonId: // value for 'taxonId'
 *   },
 * });
 */
export function useCreateTruckMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTruckMutation, CreateTruckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateTruckMutation, CreateTruckMutationVariables>(CreateTruckDocument, options);
      }
export type CreateTruckMutationHookResult = ReturnType<typeof useCreateTruckMutation>;
export type CreateTruckMutationResult = ApolloReactCommon.MutationResult<CreateTruckMutation>;
export type CreateTruckMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTruckMutation, CreateTruckMutationVariables>;