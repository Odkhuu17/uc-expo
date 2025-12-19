import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetDeliveryRequestsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter?: Types.InputMaybe<Types.DeliveryRequestFilter>;
  sort?: Types.InputMaybe<Types.SortFilter>;
}>;


export type GetDeliveryRequestsQuery = { __typename?: 'Query', deliveryRequests: { __typename?: 'DeliveryRequestConnection', totalCount: number, edges: Array<{ __typename?: 'DeliveryRequestEdge', cursor: string, node?: { __typename?: 'DeliveryRequest', id: string, price: number, status: string, travelAt: any, active: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, order: { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, packageType?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, images?: Array<string>, createdAt: any, updatedAt: any, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } } }>, nodes: Array<{ __typename?: 'DeliveryRequest', id: string, status: string }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } };


export const GetDeliveryRequestsDocument = gql`
    query GetDeliveryRequests($first: Int, $after: String, $before: String, $last: Int, $offset: Int, $filter: DeliveryRequestFilter, $sort: SortFilter = {field: "created_at", direction: desc}) {
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
        createdAt
        updatedAt
      }
    }
    nodes {
      id
      status
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
    `;

/**
 * __useGetDeliveryRequestsQuery__
 *
 * To run a query within a React component, call `useGetDeliveryRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveryRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveryRequestsQuery({
 *   variables: {
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
export function useGetDeliveryRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>(GetDeliveryRequestsDocument, options);
      }
export function useGetDeliveryRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>(GetDeliveryRequestsDocument, options);
        }
// @ts-ignore
export function useGetDeliveryRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>;
export function useGetDeliveryRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetDeliveryRequestsQuery | undefined, GetDeliveryRequestsQueryVariables>;
export function useGetDeliveryRequestsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>(GetDeliveryRequestsDocument, options);
        }
export type GetDeliveryRequestsQueryHookResult = ReturnType<typeof useGetDeliveryRequestsQuery>;
export type GetDeliveryRequestsLazyQueryHookResult = ReturnType<typeof useGetDeliveryRequestsLazyQuery>;
export type GetDeliveryRequestsSuspenseQueryHookResult = ReturnType<typeof useGetDeliveryRequestsSuspenseQuery>;
export type GetDeliveryRequestsQueryResult = ApolloReactCommon.QueryResult<GetDeliveryRequestsQuery, GetDeliveryRequestsQueryVariables>;