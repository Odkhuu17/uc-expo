import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type SearchAddressQueryVariables = Types.Exact<{
  query?: Types.InputMaybe<Types.Scalars['String']['input']>;
  location?: Types.InputMaybe<Types.LatLngInput>;
  page?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type SearchAddressQuery = { __typename?: 'Query', searchAddress?: Array<{ __typename?: 'UbCab', _id: string, _index: string, _type: string, _source: { __typename?: 'UbCabSource', nameFullMn: string, nameMn: string, nameShortMn: string, location?: { __typename?: 'UbCabLocation', lat: number, lon: number } }, quarter?: { __typename?: 'Quarter', id: string, name: string, district: { __typename?: 'District', id: string, name: string, state: { __typename?: 'State', id: string, name: string } } } }> };


export const SearchAddressDocument = gql`
    query SearchAddress($query: String, $location: LatLngInput, $page: Int) {
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
 * __useSearchAddressQuery__
 *
 * To run a query within a React component, call `useSearchAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAddressQuery({
 *   variables: {
 *      query: // value for 'query'
 *      location: // value for 'location'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSearchAddressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, options);
      }
export function useSearchAddressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, options);
        }
// @ts-ignore
export function useSearchAddressSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SearchAddressQuery, SearchAddressQueryVariables>;
export function useSearchAddressSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<SearchAddressQuery | undefined, SearchAddressQueryVariables>;
export function useSearchAddressSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<SearchAddressQuery, SearchAddressQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<SearchAddressQuery, SearchAddressQueryVariables>(SearchAddressDocument, options);
        }
export type SearchAddressQueryHookResult = ReturnType<typeof useSearchAddressQuery>;
export type SearchAddressLazyQueryHookResult = ReturnType<typeof useSearchAddressLazyQuery>;
export type SearchAddressSuspenseQueryHookResult = ReturnType<typeof useSearchAddressSuspenseQuery>;
export type SearchAddressQueryResult = ApolloReactCommon.QueryResult<SearchAddressQuery, SearchAddressQueryVariables>;