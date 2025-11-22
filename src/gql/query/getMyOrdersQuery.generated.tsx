import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMyOrdersQueryVariables = Types.Exact<{
  ordersFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetMyOrdersQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, orders: { __typename?: 'OrderConnection', totalCount: number, edges: Array<{ __typename?: 'OrderEdge', node?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, createdAt: any, updatedAt: any, origin?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } }, destination?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetMyOrdersDocument = gql`
    query GetMyOrders($ordersFirst: Int, $after: String) {
  me {
    id
    orders(first: $ordersFirst, after: $after) {
      edges {
        node {
          id
          number
          title
          status
          published
          my
          requested
          subscribed
          packageType
          packageWeight
          packageDimensions
          price
          carType
          carWeight
          senderName
          senderMobile
          receiverName
          receiverMobile
          travelAt
          travelDistance
          travelDuration
          createdAt
          updatedAt
          origin {
            id
            address {
              id
              name
              address1
              address2
              latitude
              longitude
              country {
                id
                name
              }
              state {
                id
                name
              }
              district {
                id
                name
              }
              quarter {
                id
                name
              }
            }
          }
          destination {
            id
            address {
              id
              name
              address1
              address2
              latitude
              longitude
              country {
                id
                name
              }
              state {
                id
                name
              }
              district {
                id
                name
              }
              quarter {
                id
                name
              }
            }
          }
        }
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
 * __useGetMyOrdersQuery__
 *
 * To run a query within a React component, call `useGetMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrdersQuery({
 *   variables: {
 *      ordersFirst: // value for 'ordersFirst'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetMyOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
      }
export function useGetMyOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export function useGetMyOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyOrdersQuery, GetMyOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyOrdersQuery, GetMyOrdersQueryVariables>(GetMyOrdersDocument, options);
        }
export type GetMyOrdersQueryHookResult = ReturnType<typeof useGetMyOrdersQuery>;
export type GetMyOrdersLazyQueryHookResult = ReturnType<typeof useGetMyOrdersLazyQuery>;
export type GetMyOrdersSuspenseQueryHookResult = ReturnType<typeof useGetMyOrdersSuspenseQuery>;
export type GetMyOrdersQueryResult = ApolloReactCommon.QueryResult<GetMyOrdersQuery, GetMyOrdersQueryVariables>;