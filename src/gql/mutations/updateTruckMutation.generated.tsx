import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type UpdateTruckMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  userId: Types.Scalars['ID']['input'];
  plateNumber?: Types.InputMaybe<Types.Scalars['String']['input']>;
  serial?: Types.InputMaybe<Types.Scalars['String']['input']>;
  weight?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  mark?: Types.InputMaybe<Types.Scalars['String']['input']>;
  model?: Types.InputMaybe<Types.Scalars['String']['input']>;
  netWeight?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  importedDate?: Types.InputMaybe<Types.Scalars['ISO8601DateTime']['input']>;
  manufacturedDate?: Types.InputMaybe<Types.Scalars['ISO8601DateTime']['input']>;
  taxonId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  images?: Types.InputMaybe<Array<Types.Scalars['Upload']['input']> | Types.Scalars['Upload']['input']>;
}>;


export type UpdateTruckMutation = { __typename?: 'Mutation', updateTruck?: { __typename?: 'Truck', id: string } };


export const UpdateTruckDocument = gql`
    mutation updateTruck($id: ID!, $userId: ID!, $plateNumber: String, $serial: String, $weight: Int, $mark: String, $model: String, $netWeight: Int, $importedDate: ISO8601DateTime, $manufacturedDate: ISO8601DateTime, $taxonId: ID, $images: [Upload!]) {
  updateTruck(
    input: {id: $id, userId: $userId, plateNumber: $plateNumber, serial: $serial, weight: $weight, netWeight: $netWeight, importedDate: $importedDate, manufacturedDate: $manufacturedDate, taxonId: $taxonId, mark: $mark, model: $model, images: $images}
  ) {
    id
  }
}
    `;
export type UpdateTruckMutationFn = ApolloReactCommon.MutationFunction<UpdateTruckMutation, UpdateTruckMutationVariables>;

/**
 * __useUpdateTruckMutation__
 *
 * To run a mutation, you first call `useUpdateTruckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTruckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTruckMutation, { data, loading, error }] = useUpdateTruckMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *      plateNumber: // value for 'plateNumber'
 *      serial: // value for 'serial'
 *      weight: // value for 'weight'
 *      mark: // value for 'mark'
 *      model: // value for 'model'
 *      netWeight: // value for 'netWeight'
 *      importedDate: // value for 'importedDate'
 *      manufacturedDate: // value for 'manufacturedDate'
 *      taxonId: // value for 'taxonId'
 *      images: // value for 'images'
 *   },
 * });
 */
export function useUpdateTruckMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTruckMutation, UpdateTruckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateTruckMutation, UpdateTruckMutationVariables>(UpdateTruckDocument, options);
      }
export type UpdateTruckMutationHookResult = ReturnType<typeof useUpdateTruckMutation>;
export type UpdateTruckMutationResult = ApolloReactCommon.MutationResult<UpdateTruckMutation>;
export type UpdateTruckMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTruckMutation, UpdateTruckMutationVariables>;