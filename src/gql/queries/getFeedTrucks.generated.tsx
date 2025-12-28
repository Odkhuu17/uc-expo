import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetFeedTrucksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetFeedTrucksQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, trucks: Array<{ __typename?: 'Truck', id: string, subscribed: boolean }> } };


export const GetFeedTrucksDocument = gql`
    query GetFeedTrucks {
  me {
    id
    trucks {
      id
      subscribed
    }
  }
}
    `;

/**
 * __useGetFeedTrucksQuery__
 *
 * To run a query within a React component, call `useGetFeedTrucksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedTrucksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedTrucksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeedTrucksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>(GetFeedTrucksDocument, options);
      }
export function useGetFeedTrucksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>(GetFeedTrucksDocument, options);
        }
// @ts-ignore
export function useGetFeedTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>;
export function useGetFeedTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetFeedTrucksQuery | undefined, GetFeedTrucksQueryVariables>;
export function useGetFeedTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>(GetFeedTrucksDocument, options);
        }
export type GetFeedTrucksQueryHookResult = ReturnType<typeof useGetFeedTrucksQuery>;
export type GetFeedTrucksLazyQueryHookResult = ReturnType<typeof useGetFeedTrucksLazyQuery>;
export type GetFeedTrucksSuspenseQueryHookResult = ReturnType<typeof useGetFeedTrucksSuspenseQuery>;
export type GetFeedTrucksQueryResult = ApolloReactCommon.QueryResult<GetFeedTrucksQuery, GetFeedTrucksQueryVariables>;