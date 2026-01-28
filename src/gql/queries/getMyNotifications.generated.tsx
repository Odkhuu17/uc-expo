import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMyNotificationsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetMyNotificationsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, notifications: { __typename?: 'NotificationConnection', totalCount: number, edges: Array<{ __typename?: 'NotificationEdge', cursor: string, node?: { __typename?: 'Notification', id: string, message?: string, createdAt: any } }>, nodes: Array<{ __typename?: 'Notification', id: string, message?: string, createdAt: any }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetMyNotificationsDocument = gql`
    query GetMyNotifications($first: Int, $after: String, $before: String, $last: Int, $offset: Int, $sort: SortFilter) {
  me {
    id
    notifications(
      first: $first
      after: $after
      before: $before
      last: $last
      offset: $offset
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          message
          createdAt
        }
      }
      nodes {
        id
        message
        createdAt
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
}
    `;

/**
 * __useGetMyNotificationsQuery__
 *
 * To run a query within a React component, call `useGetMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNotificationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMyNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, options);
      }
export function useGetMyNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, options);
        }
// @ts-ignore
export function useGetMyNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;
export function useGetMyNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyNotificationsQuery | undefined, GetMyNotificationsQueryVariables>;
export function useGetMyNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, options);
        }
export type GetMyNotificationsQueryHookResult = ReturnType<typeof useGetMyNotificationsQuery>;
export type GetMyNotificationsLazyQueryHookResult = ReturnType<typeof useGetMyNotificationsLazyQuery>;
export type GetMyNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetMyNotificationsSuspenseQuery>;
export type GetMyNotificationsQueryResult = ApolloReactCommon.QueryResult<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;