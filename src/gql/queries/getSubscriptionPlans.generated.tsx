import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetSubscriptionPlansQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filter?: Types.InputMaybe<Types.SubscriptionPlanFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetSubscriptionPlansQuery = { __typename?: 'Query', subscriptionPlans: { __typename?: 'SubscriptionPlanConnection', totalCount: number, edges: Array<{ __typename?: 'SubscriptionPlanEdge', cursor: string, node?: { __typename?: 'SubscriptionPlan', id: string, name: string, code: string, price: number, duration: string, active: boolean, startAt: any, endAt?: any, preferences?: any, createdAt: any, updatedAt: any } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } };


export const GetSubscriptionPlansDocument = gql`
    query getSubscriptionPlans($first: Int, $after: String, $filter: SubscriptionPlanFilter, $sort: SortFilter) {
  subscriptionPlans(first: $first, after: $after, filter: $filter, sort: $sort) {
    edges {
      node {
        id
        name
        code
        price
        duration
        active
        startAt
        endAt
        preferences
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
 * __useGetSubscriptionPlansQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionPlansQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetSubscriptionPlansQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>(GetSubscriptionPlansDocument, options);
      }
export function useGetSubscriptionPlansLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>(GetSubscriptionPlansDocument, options);
        }
// @ts-ignore
export function useGetSubscriptionPlansSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>;
export function useGetSubscriptionPlansSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetSubscriptionPlansQuery | undefined, GetSubscriptionPlansQueryVariables>;
export function useGetSubscriptionPlansSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>(GetSubscriptionPlansDocument, options);
        }
export type GetSubscriptionPlansQueryHookResult = ReturnType<typeof useGetSubscriptionPlansQuery>;
export type GetSubscriptionPlansLazyQueryHookResult = ReturnType<typeof useGetSubscriptionPlansLazyQuery>;
export type GetSubscriptionPlansSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionPlansSuspenseQuery>;
export type GetSubscriptionPlansQueryResult = ApolloReactCommon.QueryResult<GetSubscriptionPlansQuery, GetSubscriptionPlansQueryVariables>;