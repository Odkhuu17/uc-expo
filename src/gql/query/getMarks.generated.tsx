import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMarksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMarksQuery = { __typename?: 'Query', marks: { __typename?: 'MarkConnection', nodes: Array<{ __typename?: 'Mark', id: string, name: string, code: string }> } };


export const GetMarksDocument = gql`
    query GetMarks {
  marks {
    nodes {
      id
      name
      code
    }
  }
}
    `;

/**
 * __useGetMarksQuery__
 *
 * To run a query within a React component, call `useGetMarksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMarksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMarksQuery, GetMarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMarksQuery, GetMarksQueryVariables>(GetMarksDocument, options);
      }
export function useGetMarksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMarksQuery, GetMarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMarksQuery, GetMarksQueryVariables>(GetMarksDocument, options);
        }
export function useGetMarksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMarksQuery, GetMarksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMarksQuery, GetMarksQueryVariables>(GetMarksDocument, options);
        }
export type GetMarksQueryHookResult = ReturnType<typeof useGetMarksQuery>;
export type GetMarksLazyQueryHookResult = ReturnType<typeof useGetMarksLazyQuery>;
export type GetMarksSuspenseQueryHookResult = ReturnType<typeof useGetMarksSuspenseQuery>;
export type GetMarksQueryResult = ApolloReactCommon.QueryResult<GetMarksQuery, GetMarksQueryVariables>;