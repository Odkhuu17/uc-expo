import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetOrderRequestsQueryVariables = Types.Exact<{
  number?: Types.InputMaybe<Types.Scalars['String']['input']>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter?: Types.InputMaybe<Types.DeliveryRequestFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetOrderRequestsQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, carType?: string, deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', cursor: string, node?: { __typename?: 'DeliveryRequest', id: string, price: string, status: string, travelAt?: any, active: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, order: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string } } }>, nodes: Array<{ __typename?: 'DeliveryRequest', id: string, price: string, status: string, travelAt?: any, active: boolean }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetOrderRequestsDocument = gql`
    query GetOrderRequests($number: String, $first: Int, $after: String, $before: String, $last: Int, $offset: Int, $filter: DeliveryRequestFilter, $sort: SortFilter = {field: "created_at", direction: desc}) {
  order(number: $number) {
    id
    number
    title
    status
    carType
    deliveryRequests(
      first: $first
      after: $after
      before: $before
      last: $last
      offset: $offset
      filter: $filter
      sort: $sort
    ) {
      edges {
        cursor
        node {
          id
          price
          status
          travelAt
          active
          user {
            id
            firstName
            lastName
            nickName
            mobile
            email
          }
          order {
            id
            number
            title
            status
          }
          createdAt
          updatedAt
        }
      }
      nodes {
        id
        price
        status
        travelAt
        active
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
    `;

/**
 * __useGetOrderRequestsQuery__
 *
 * To run a query within a React component, call `useGetOrderRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderRequestsQuery({
 *   variables: {
 *      number: // value for 'number'
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
export function useGetOrderRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>(GetOrderRequestsDocument, options);
      }
export function useGetOrderRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>(GetOrderRequestsDocument, options);
        }
// @ts-ignore
export function useGetOrderRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>;
export function useGetOrderRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetOrderRequestsQuery | undefined, GetOrderRequestsQueryVariables>;
export function useGetOrderRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>(GetOrderRequestsDocument, options);
        }
export type GetOrderRequestsQueryHookResult = ReturnType<typeof useGetOrderRequestsQuery>;
export type GetOrderRequestsLazyQueryHookResult = ReturnType<typeof useGetOrderRequestsLazyQuery>;
export type GetOrderRequestsSuspenseQueryHookResult = ReturnType<typeof useGetOrderRequestsSuspenseQuery>;
export type GetOrderRequestsQueryResult = ApolloReactCommon.QueryResult<GetOrderRequestsQuery, GetOrderRequestsQueryVariables>;