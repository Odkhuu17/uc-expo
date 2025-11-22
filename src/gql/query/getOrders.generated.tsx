import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetOrdersQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filter?: Types.InputMaybe<Types.OrderFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
  deliveryRequestsFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', orders: { __typename?: 'OrderConnection', totalCount: number, edges: Array<{ __typename?: 'OrderEdge', cursor: string, node?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, audio?: string, images?: Array<string>, validPasswordLocal?: boolean, createdAt: any, updatedAt: any, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }>, origin?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } }, destination?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } }, user?: { __typename?: 'User', id: string, email?: string, firstName?: string, lastName?: string, mobile?: string, role?: string, isAdmin: boolean }, deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', node?: { __typename?: 'DeliveryRequest', id: string, price: number, travelAt: any, status: string, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, mobile?: string, email?: string } } }> } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } };


export const GetOrdersDocument = gql`
    query getOrders($first: Int, $after: String, $filter: OrderFilter, $sort: SortFilter, $deliveryRequestsFirst: Int) {
  orders(first: $first, after: $after, filter: $filter, sort: $sort) {
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
        audio
        images
        imageObjects {
          id
          url
          fileName
          recordId
          recordType
        }
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
        user {
          id
          email
          firstName
          lastName
          mobile
          role
          isAdmin
        }
        deliveryRequests(first: $deliveryRequestsFirst) {
          edges {
            node {
              id
              price
              travelAt
              status
              user {
                id
                firstName
                lastName
                mobile
                email
              }
            }
          }
          totalCount
        }
        validPasswordLocal
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
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      deliveryRequestsFirst: // value for 'deliveryRequestsFirst'
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = ApolloReactCommon.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;