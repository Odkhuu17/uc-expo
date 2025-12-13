import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetTaxonsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter?: Types.InputMaybe<Types.TaxonFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetTaxonsQuery = { __typename?: 'Query', taxons: { __typename?: 'TaxonConnection', totalCount: number, edges: Array<{ __typename?: 'TaxonEdge', cursor: string, node?: { __typename?: 'Taxon', id: string, code: string, name: string, link: string, icon?: string, slug: string, preferences?: any, hasChildren?: boolean, parentId?: string, createdAt: any, updatedAt: any, parent?: { __typename?: 'Taxon', id: string, code: string, name: string }, children?: Array<{ __typename?: 'Taxon', id: string, code: string, name: string }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } };


export const GetTaxonsDocument = gql`
    query GetTaxons($first: Int, $after: String, $before: String, $last: Int, $offset: Int, $filter: TaxonFilter, $sort: SortFilter) {
  taxons(
    first: $first
    after: $after
    before: $before
    last: $last
    offset: $offset
    filter: $filter
    sort: $sort
  ) {
    edges {
      node {
        id
        code
        name
        link
        icon
        slug
        preferences
        hasChildren
        parentId
        parent {
          id
          code
          name
        }
        children {
          id
          code
          name
        }
        createdAt
        updatedAt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `;

/**
 * __useGetTaxonsQuery__
 *
 * To run a query within a React component, call `useGetTaxonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaxonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaxonsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetTaxonsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTaxonsQuery, GetTaxonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTaxonsQuery, GetTaxonsQueryVariables>(GetTaxonsDocument, options);
      }
export function useGetTaxonsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTaxonsQuery, GetTaxonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTaxonsQuery, GetTaxonsQueryVariables>(GetTaxonsDocument, options);
        }
// @ts-ignore
export function useGetTaxonsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetTaxonsQuery, GetTaxonsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTaxonsQuery, GetTaxonsQueryVariables>;
export function useGetTaxonsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTaxonsQuery, GetTaxonsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTaxonsQuery | undefined, GetTaxonsQueryVariables>;
export function useGetTaxonsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTaxonsQuery, GetTaxonsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetTaxonsQuery, GetTaxonsQueryVariables>(GetTaxonsDocument, options);
        }
export type GetTaxonsQueryHookResult = ReturnType<typeof useGetTaxonsQuery>;
export type GetTaxonsLazyQueryHookResult = ReturnType<typeof useGetTaxonsLazyQuery>;
export type GetTaxonsSuspenseQueryHookResult = ReturnType<typeof useGetTaxonsSuspenseQuery>;
export type GetTaxonsQueryResult = ApolloReactCommon.QueryResult<GetTaxonsQuery, GetTaxonsQueryVariables>;