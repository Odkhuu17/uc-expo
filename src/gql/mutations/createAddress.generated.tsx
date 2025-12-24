import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreateAddressMutationVariables = Types.Exact<{
  address1?: Types.InputMaybe<Types.Scalars['String']['input']>;
  address2?: Types.InputMaybe<Types.Scalars['String']['input']>;
  location?: Types.InputMaybe<Types.LatLngInput>;
  sdq?: Types.InputMaybe<Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input']>;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, mobile?: string, email?: string, firstName?: string, lastName?: string, alternativeMobile?: string, alternativeEmail?: string, zipcode?: string, latitude?: string, longitude?: string, preferences: any, createdAt: any, updatedAt: any, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } };


export const CreateAddressDocument = gql`
    mutation createAddress($address1: String, $address2: String, $location: LatLngInput, $sdq: [ID!]) {
  createAddress(
    input: {address1: $address1, address2: $address2, location: $location, sdq: $sdq}
  ) {
    id
    name
    address1
    address2
    mobile
    email
    firstName
    lastName
    alternativeMobile
    alternativeEmail
    zipcode
    latitude
    longitude
    preferences
    country {
      id
      name
    }
    state {
      id
      name
    }
    district {
      id
      name
    }
    quarter {
      id
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateAddressMutationFn = ApolloReactCommon.MutationFunction<CreateAddressMutation, CreateAddressMutationVariables>;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      address1: // value for 'address1'
 *      address2: // value for 'address2'
 *      location: // value for 'location'
 *      sdq: // value for 'sdq'
 *   },
 * });
 */
export function useCreateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export type CreateAddressMutationResult = ApolloReactCommon.MutationResult<CreateAddressMutation>;
export type CreateAddressMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAddressMutation, CreateAddressMutationVariables>;