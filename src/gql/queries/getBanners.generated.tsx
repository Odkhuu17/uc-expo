import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetBannersQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter?: Types.InputMaybe<Types.BannerFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetBannersQuery = { __typename?: 'Query', banners: { __typename?: 'BannerConnection', totalCount: number, nodes: Array<{ __typename?: 'Banner', id: string, image?: string, permalink?: string, position: number }> } };


export const GetBannersDocument = gql`
    query GetBanners($first: Int, $offset: Int, $filter: BannerFilter, $sort: SortFilter) {
  banners(first: $first, offset: $offset, filter: $filter, sort: $sort) {
    totalCount
    nodes {
      id
      image
      permalink
      position
    }
  }
}
    `;

/**
 * __useGetBannersQuery__
 *
 * To run a query within a React component, call `useGetBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetBannersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
      }
export function useGetBannersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
        }
// @ts-ignore
export function useGetBannersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetBannersQuery, GetBannersQueryVariables>;
export function useGetBannersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetBannersQuery | undefined, GetBannersQueryVariables>;
export function useGetBannersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
        }
export type GetBannersQueryHookResult = ReturnType<typeof useGetBannersQuery>;
export type GetBannersLazyQueryHookResult = ReturnType<typeof useGetBannersLazyQuery>;
export type GetBannersSuspenseQueryHookResult = ReturnType<typeof useGetBannersSuspenseQuery>;
export type GetBannersQueryResult = ApolloReactCommon.QueryResult<GetBannersQuery, GetBannersQueryVariables>;