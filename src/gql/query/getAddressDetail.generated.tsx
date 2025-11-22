import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetAddressDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetAddressDetailQuery = { __typename?: 'Query', address?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, mobile?: string, email?: string, firstName?: string, lastName?: string, alternativeMobile?: string, alternativeEmail?: string, zipcode?: string, latitude?: string, longitude?: string, preferences: any, sdq?: Array<string>, createdAt: any, updatedAt: any, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string }, location?: { __typename?: 'Location', id: string, latitude?: number, longitude?: number } } };


export const GetAddressDetailDocument = gql`
    query getAddressDetail($id: ID!) {
  address(id: $id) {
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
    location {
      id
      latitude
      longitude
    }
    sdq
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAddressDetailQuery__
 *
 * To run a query within a React component, call `useGetAddressDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAddressDetailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetAddressDetailQuery, GetAddressDetailQueryVariables> & ({ variables: GetAddressDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAddressDetailQuery, GetAddressDetailQueryVariables>(GetAddressDetailDocument, options);
      }
export function useGetAddressDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAddressDetailQuery, GetAddressDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAddressDetailQuery, GetAddressDetailQueryVariables>(GetAddressDetailDocument, options);
        }
export function useGetAddressDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAddressDetailQuery, GetAddressDetailQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAddressDetailQuery, GetAddressDetailQueryVariables>(GetAddressDetailDocument, options);
        }
export type GetAddressDetailQueryHookResult = ReturnType<typeof useGetAddressDetailQuery>;
export type GetAddressDetailLazyQueryHookResult = ReturnType<typeof useGetAddressDetailLazyQuery>;
export type GetAddressDetailSuspenseQueryHookResult = ReturnType<typeof useGetAddressDetailSuspenseQuery>;
export type GetAddressDetailQueryResult = ApolloReactCommon.QueryResult<GetAddressDetailQuery, GetAddressDetailQueryVariables>;