import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetOrderDetailQueryVariables = Types.Exact<{
  number?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetOrderDetailQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, number?: string, title?: string, description?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, taxonId?: string, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, vatIncluded?: boolean, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, data: any, audio?: string, video?: string, images?: Array<string>, createdAt: any, updatedAt: any, acceptedDeliveryRequest?: { __typename?: 'DeliveryRequest', id: string, price: string, status: string, travelAt: any, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string } }, myRequest?: { __typename?: 'DeliveryRequest', id: string, active: boolean, status: string, price: string, travelAt: any, createdAt: any, updatedAt: any }, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }>, user?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, mobile?: string, email?: string, firstName?: string, lastName?: string, alternativeMobile?: string, alternativeEmail?: string, zipcode?: string, latitude?: string, longitude?: string, preferences: any, createdAt: any, updatedAt: any, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, mobile?: string, email?: string, firstName?: string, lastName?: string, alternativeMobile?: string, alternativeEmail?: string, zipcode?: string, latitude?: string, longitude?: string, preferences: any, createdAt: any, updatedAt: any, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', node?: { __typename?: 'DeliveryRequest', id: string, active: boolean, status: string, price: string, travelAt: any, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetOrderDetailDocument = gql`
    query GetOrderDetail($number: String) {
  order(number: $number) {
    id
    number
    title
    description
    status
    published
    my
    requested
    subscribed
    taxonId
    acceptedDeliveryRequest {
      id
      price
      status
      travelAt
      user {
        id
        firstName
        lastName
        nickName
        mobile
        email
      }
    }
    myRequest {
      id
      active
      status
      price
      travelAt
      createdAt
      updatedAt
    }
    packageType
    packageWeight
    packageDimensions
    price
    vatIncluded
    carType
    carWeight
    senderName
    senderMobile
    receiverName
    receiverMobile
    travelAt
    travelDistance
    travelDuration
    data
    audio
    video
    images
    imageObjects {
      id
      url
      fileName
      recordId
      recordType
    }
    user {
      id
      firstName
      lastName
      nickName
      mobile
      email
    }
    origin {
      id
      name
      address1
      address2
      mobile
      email
      firstName
      lastName
      alternativeMobile
      alternativeEmail
      zipcode
      latitude
      longitude
      preferences
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
      createdAt
      updatedAt
    }
    destination {
      id
      name
      address1
      address2
      mobile
      email
      firstName
      lastName
      alternativeMobile
      alternativeEmail
      zipcode
      latitude
      longitude
      preferences
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
      createdAt
      updatedAt
    }
    deliveryRequests {
      edges {
        node {
          id
          active
          status
          price
          travelAt
          user {
            id
            firstName
            lastName
            nickName
            mobile
            email
          }
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOrderDetailQuery__
 *
 * To run a query within a React component, call `useGetOrderDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderDetailQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useGetOrderDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrderDetailQuery, GetOrderDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrderDetailQuery, GetOrderDetailQueryVariables>(GetOrderDetailDocument, options);
      }
export function useGetOrderDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderDetailQuery, GetOrderDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrderDetailQuery, GetOrderDetailQueryVariables>(GetOrderDetailDocument, options);
        }
// @ts-ignore
export function useGetOrderDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetOrderDetailQuery, GetOrderDetailQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetOrderDetailQuery, GetOrderDetailQueryVariables>;
export function useGetOrderDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrderDetailQuery, GetOrderDetailQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetOrderDetailQuery | undefined, GetOrderDetailQueryVariables>;
export function useGetOrderDetailSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrderDetailQuery, GetOrderDetailQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrderDetailQuery, GetOrderDetailQueryVariables>(GetOrderDetailDocument, options);
        }
export type GetOrderDetailQueryHookResult = ReturnType<typeof useGetOrderDetailQuery>;
export type GetOrderDetailLazyQueryHookResult = ReturnType<typeof useGetOrderDetailLazyQuery>;
export type GetOrderDetailSuspenseQueryHookResult = ReturnType<typeof useGetOrderDetailSuspenseQuery>;
export type GetOrderDetailQueryResult = ApolloReactCommon.QueryResult<GetOrderDetailQuery, GetOrderDetailQueryVariables>;