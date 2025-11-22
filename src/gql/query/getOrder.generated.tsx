import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetOrderQueryVariables = Types.Exact<{
  number?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetOrderQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, audio?: string, images?: Array<string>, createdAt: any, updatedAt: any, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }>, origin?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } }, destination?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } }, user?: { __typename?: 'User', id: string, email?: string, firstName?: string, lastName?: string, mobile?: string, role?: string, isAdmin: boolean }, deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', node?: { __typename?: 'DeliveryRequest', id: string, price: number, travelAt: any, status: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, mobile?: string, email?: string, role?: string } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetOrderDocument = gql`
    query getOrder($number: String) {
  order(number: $number) {
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
    deliveryRequests(first: 50) {
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
            role
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
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export function useGetOrderSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderSuspenseQueryHookResult = ReturnType<typeof useGetOrderSuspenseQuery>;
export type GetOrderQueryResult = ApolloReactCommon.QueryResult<GetOrderQuery, GetOrderQueryVariables>;