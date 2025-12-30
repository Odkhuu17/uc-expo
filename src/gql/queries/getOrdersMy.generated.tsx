import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import { OrderFragmentFragmentDoc } from '../fragments/order.generated';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetOrdersMyQueryVariables = Types.Exact<{
  ordersFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filter?: Types.InputMaybe<Types.OrderFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetOrdersMyQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, orders: { __typename?: 'OrderConnection', totalCount: number, edges: Array<{ __typename?: 'OrderEdge', cursor: string, node?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, packageType?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, images?: Array<string>, subscribed: boolean, createdAt: any, updatedAt: any, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetOrdersMyDocument = gql`
    query GetOrdersMy($ordersFirst: Int, $after: String, $filter: OrderFilter = {published: {eq: true}}, $sort: SortFilter = {field: "created_at", direction: desc}) {
  me {
    id
    orders(first: $ordersFirst, after: $after, filter: $filter, sort: $sort) {
      edges {
        node {
          ...OrderFragment
        }
        cursor
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
    ${OrderFragmentFragmentDoc}`;

/**
 * __useGetOrdersMyQuery__
 *
 * To run a query within a React component, call `useGetOrdersMyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersMyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersMyQuery({
 *   variables: {
 *      ordersFirst: // value for 'ordersFirst'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetOrdersMyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrdersMyQuery, GetOrdersMyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrdersMyQuery, GetOrdersMyQueryVariables>(GetOrdersMyDocument, options);
      }
export function useGetOrdersMyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrdersMyQuery, GetOrdersMyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrdersMyQuery, GetOrdersMyQueryVariables>(GetOrdersMyDocument, options);
        }
// @ts-ignore
export function useGetOrdersMySuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetOrdersMyQuery, GetOrdersMyQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetOrdersMyQuery, GetOrdersMyQueryVariables>;
export function useGetOrdersMySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrdersMyQuery, GetOrdersMyQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetOrdersMyQuery | undefined, GetOrdersMyQueryVariables>;
export function useGetOrdersMySuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrdersMyQuery, GetOrdersMyQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrdersMyQuery, GetOrdersMyQueryVariables>(GetOrdersMyDocument, options);
        }
export type GetOrdersMyQueryHookResult = ReturnType<typeof useGetOrdersMyQuery>;
export type GetOrdersMyLazyQueryHookResult = ReturnType<typeof useGetOrdersMyLazyQuery>;
export type GetOrdersMySuspenseQueryHookResult = ReturnType<typeof useGetOrdersMySuspenseQuery>;
export type GetOrdersMyQueryResult = ApolloReactCommon.QueryResult<GetOrdersMyQuery, GetOrdersMyQueryVariables>;