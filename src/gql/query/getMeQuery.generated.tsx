import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMeQueryVariables = Types.Exact<{
  ordersFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  trucksFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  deliveryRequestsFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  subscriptionsFirst?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, email?: string, mobile?: string, gender?: string, nickName?: string, registerNum?: string, role?: string, isAdmin: boolean, subscribed?: boolean, createdAt: any, updatedAt: any, roles?: Array<{ __typename?: 'Role', id: string, name?: string, createdAt: any, updatedAt: any }>, orders: { __typename?: 'OrderConnection', totalCount: number, edges: Array<{ __typename?: 'OrderEdge', node?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, createdAt: any, updatedAt: any } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } }, trucks: Array<{ __typename?: 'Truck', id: string, plateNumber?: string, serial?: string, weight?: number, netWeight?: number, importedDate?: any, manufacturedDate?: any, createdAt: any, updatedAt: any, currentTrack?: { __typename?: 'TruckTrack', id: string, latitude?: number, longitude?: number, status?: string, createdAt: any } }>, deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', node?: { __typename?: 'DeliveryRequest', id: string, price: number, travelAt: any, status: string, active: boolean, createdAt: any, updatedAt: any, order: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } }, subscriptions: { __typename?: 'SubscriptionConnection', totalCount: number, edges: Array<{ __typename?: 'SubscriptionEdge', node?: { __typename?: 'Subscription', id: string, active: boolean, autoRenew: boolean, paymentStatus: string, startAt: any, endAt: any, valid: boolean, createdAt: any, updatedAt: any, subscriptionPlan: { __typename?: 'SubscriptionPlan', id: string, name: string, code: string, price: number, duration: string, active: boolean } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetMeDocument = gql`
    query GetMe($ordersFirst: Int, $trucksFirst: Int, $deliveryRequestsFirst: Int, $subscriptionsFirst: Int) {
  me {
    id
    firstName
    lastName
    email
    mobile
    gender
    nickName
    registerNum
    role
    roles {
      id
      name
      createdAt
      updatedAt
    }
    isAdmin
    subscribed
    orders(first: $ordersFirst) {
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
    trucks {
      id
      plateNumber
      serial
      weight
      netWeight
      importedDate
      manufacturedDate
      currentTrack {
        id
        latitude
        longitude
        status
        createdAt
      }
      createdAt
      updatedAt
    }
    deliveryRequests(first: $deliveryRequestsFirst) {
      edges {
        node {
          id
          price
          travelAt
          status
          active
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
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    subscriptions(first: $subscriptionsFirst) {
      edges {
        node {
          id
          active
          autoRenew
          paymentStatus
          startAt
          endAt
          valid
          subscriptionPlan {
            id
            name
            code
            price
            duration
            active
          }
          createdAt
          updatedAt
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
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *      ordersFirst: // value for 'ordersFirst'
 *      trucksFirst: // value for 'trucksFirst'
 *      deliveryRequestsFirst: // value for 'deliveryRequestsFirst'
 *      subscriptionsFirst: // value for 'subscriptionsFirst'
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
// @ts-ignore
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMeQuery, GetMeQueryVariables>;
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMeQuery | undefined, GetMeQueryVariables>;
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = ApolloReactCommon.QueryResult<GetMeQuery, GetMeQueryVariables>;