import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type AddressSearchQueryVariables = Types.Exact<{
  query?: Types.InputMaybe<Types.Scalars['String']['input']>;
  location?: Types.InputMaybe<Types.LatLngInput>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type AddressSearchQuery = { __typename?: 'Query', searchAddress?: Array<{ __typename?: 'UbCab', _id: string, _index: string, _type: string, _source: { __typename?: 'UbCabSource', nameFullMn: string, nameMn: string, nameShortMn: string, location: { __typename?: 'UbCabLocation', lat: number, lon: number } }, quarter?: { __typename?: 'Quarter', id: string, name: string, district: { __typename?: 'District', id: string, name: string, state: { __typename?: 'State', id: string, name: string } } } }> };


export const AddressSearchDocument = gql`
    query AddressSearch($query: String, $location: LatLngInput, $page: Int) {
  searchAddress(query: $query, location: $location, page: $page) {
    _id
    _index
    _source {
      location {
        lat
        lon
      }
      nameFullMn
      nameMn
      nameShortMn
    }
    _type
    quarter {
      id
      name
      district {
        id
        name
        state {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useAddressSearchQuery__
 *
 * To run a query within a React component, call `useAddressSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      location: // value for 'location'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAddressSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AddressSearchQuery, AddressSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AddressSearchQuery, AddressSearchQueryVariables>(AddressSearchDocument, options);
      }
export function useAddressSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddressSearchQuery, AddressSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AddressSearchQuery, AddressSearchQueryVariables>(AddressSearchDocument, options);
        }
// @ts-ignore
export function useAddressSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AddressSearchQuery, AddressSearchQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AddressSearchQuery, AddressSearchQueryVariables>;
export function useAddressSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AddressSearchQuery, AddressSearchQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AddressSearchQuery | undefined, AddressSearchQueryVariables>;
export function useAddressSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AddressSearchQuery, AddressSearchQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AddressSearchQuery, AddressSearchQueryVariables>(AddressSearchDocument, options);
        }
export type AddressSearchQueryHookResult = ReturnType<typeof useAddressSearchQuery>;
export type AddressSearchLazyQueryHookResult = ReturnType<typeof useAddressSearchLazyQuery>;
export type AddressSearchSuspenseQueryHookResult = ReturnType<typeof useAddressSearchSuspenseQuery>;
export type AddressSearchQueryResult = ApolloReactCommon.QueryResult<AddressSearchQuery, AddressSearchQueryVariables>;