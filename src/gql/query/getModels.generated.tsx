import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetModelsQueryVariables = Types.Exact<{
  markId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type GetModelsQuery = { __typename?: 'Query', models: { __typename?: 'ModelConnection', nodes: Array<{ __typename?: 'Model', id: string, name: string, code: string, markId: string, mark: { __typename?: 'Mark', id: string, name: string, code: string } }> } };


export const GetModelsDocument = gql`
    query GetModels($markId: ID) {
  models(filter: {mark: {id: {eq: $markId}}}) {
    nodes {
      id
      name
      code
      markId
      mark {
        id
        name
        code
      }
    }
  }
}
    `;

/**
 * __useGetModelsQuery__
 *
 * To run a query within a React component, call `useGetModelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModelsQuery({
 *   variables: {
 *      markId: // value for 'markId'
 *   },
 * });
 */
export function useGetModelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetModelsQuery, GetModelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetModelsQuery, GetModelsQueryVariables>(GetModelsDocument, options);
      }
export function useGetModelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetModelsQuery, GetModelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetModelsQuery, GetModelsQueryVariables>(GetModelsDocument, options);
        }
export function useGetModelsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetModelsQuery, GetModelsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetModelsQuery, GetModelsQueryVariables>(GetModelsDocument, options);
        }
export type GetModelsQueryHookResult = ReturnType<typeof useGetModelsQuery>;
export type GetModelsLazyQueryHookResult = ReturnType<typeof useGetModelsLazyQuery>;
export type GetModelsSuspenseQueryHookResult = ReturnType<typeof useGetModelsSuspenseQuery>;
export type GetModelsQueryResult = ApolloReactCommon.QueryResult<GetModelsQuery, GetModelsQueryVariables>;