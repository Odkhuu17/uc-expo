import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMyDeliveryRequestsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetMyDeliveryRequestsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, mobile?: string, registerNum?: string, subscribed?: boolean, verified: boolean, avatar?: string, deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', node?: { __typename?: 'DeliveryRequest', id: string, active: boolean, status: string, price: string, travelAt: any, createdAt: any, updatedAt: any, order: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, packageType?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, images?: Array<string>, createdAt: any, updatedAt: any, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } } };


export const GetMyDeliveryRequestsDocument = gql`
    query getMyDeliveryRequests($first: Int, $after: String, $sort: SortFilter = {field: "created_at", direction: desc}) {
  me {
    id
    firstName
    lastName
    mobile
    registerNum
    subscribed
    verified
    avatar
    deliveryRequests(first: $first, after: $after, sort: $sort) {
      edges {
        node {
          id
          active
          status
          price
          travelAt
          createdAt
          updatedAt
          order {
            id
            number
            title
            status
            published
            my
            requested
            packageType
            price
            carType
            carWeight
            senderName
            senderMobile
            receiverName
            receiverMobile
            travelAt
            images
            origin {
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
            destination {
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
            createdAt
            updatedAt
          }
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
  }
}
    `;

/**
 * __useGetMyDeliveryRequestsQuery__
 *
 * To run a query within a React component, call `useGetMyDeliveryRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyDeliveryRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyDeliveryRequestsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMyDeliveryRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>(GetMyDeliveryRequestsDocument, options);
      }
export function useGetMyDeliveryRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>(GetMyDeliveryRequestsDocument, options);
        }
// @ts-ignore
export function useGetMyDeliveryRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>;
export function useGetMyDeliveryRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyDeliveryRequestsQuery | undefined, GetMyDeliveryRequestsQueryVariables>;
export function useGetMyDeliveryRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>(GetMyDeliveryRequestsDocument, options);
        }
export type GetMyDeliveryRequestsQueryHookResult = ReturnType<typeof useGetMyDeliveryRequestsQuery>;
export type GetMyDeliveryRequestsLazyQueryHookResult = ReturnType<typeof useGetMyDeliveryRequestsLazyQuery>;
export type GetMyDeliveryRequestsSuspenseQueryHookResult = ReturnType<typeof useGetMyDeliveryRequestsSuspenseQuery>;
export type GetMyDeliveryRequestsQueryResult = ApolloReactCommon.QueryResult<GetMyDeliveryRequestsQuery, GetMyDeliveryRequestsQueryVariables>;