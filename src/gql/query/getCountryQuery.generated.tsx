import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetCountryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCountryQuery = { __typename?: 'Query', country: { __typename?: 'Country', id: string, sdq: any } };


export const GetCountryDocument = gql`
    query GetCountry {
  country(iso: "MN") {
    id
    sdq
  }
}
    `;

/**
 * __useGetCountryQuery__
 *
 * To run a query within a React component, call `useGetCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCountryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
      }
export function useGetCountryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
        }
export function useGetCountrySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCountryQuery, GetCountryQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCountryQuery, GetCountryQueryVariables>(GetCountryDocument, options);
        }
export type GetCountryQueryHookResult = ReturnType<typeof useGetCountryQuery>;
export type GetCountryLazyQueryHookResult = ReturnType<typeof useGetCountryLazyQuery>;
export type GetCountrySuspenseQueryHookResult = ReturnType<typeof useGetCountrySuspenseQuery>;
export type GetCountryQueryResult = ApolloReactCommon.QueryResult<GetCountryQuery, GetCountryQueryVariables>;