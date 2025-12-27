import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetTrackTruckQueryVariables = Types.Exact<{
  number?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetTrackTruckQuery = { __typename?: 'Query', order?: { __typename?: 'Order', id: string, number?: string, title?: string, description?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, vatIncluded?: boolean, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, data: any, audio?: string, video?: string, images?: Array<string>, createdAt: any, updatedAt: any, acceptedDeliveryRequest?: { __typename?: 'DeliveryRequest', id: string, truck?: { __typename?: 'Truck', id: string, currentTrack?: { __typename?: 'TruckTrack', id: string, latitude?: number, longitude?: number } } }, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, mobile?: string, email?: string, firstName?: string, lastName?: string, alternativeMobile?: string, alternativeEmail?: string, zipcode?: string, latitude?: string, longitude?: string, preferences: any, createdAt: any, updatedAt: any, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, mobile?: string, email?: string, firstName?: string, lastName?: string, alternativeMobile?: string, alternativeEmail?: string, zipcode?: string, latitude?: string, longitude?: string, preferences: any, createdAt: any, updatedAt: any, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } };


export const GetTrackTruckDocument = gql`
    query GetTrackTruck($number: String) {
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
    acceptedDeliveryRequest {
      id
      truck {
        id
        currentTrack {
          id
          latitude
          longitude
        }
      }
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
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTrackTruckQuery__
 *
 * To run a query within a React component, call `useGetTrackTruckQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackTruckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackTruckQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useGetTrackTruckQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrackTruckQuery, GetTrackTruckQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTrackTruckQuery, GetTrackTruckQueryVariables>(GetTrackTruckDocument, options);
      }
export function useGetTrackTruckLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrackTruckQuery, GetTrackTruckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTrackTruckQuery, GetTrackTruckQueryVariables>(GetTrackTruckDocument, options);
        }
// @ts-ignore
export function useGetTrackTruckSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetTrackTruckQuery, GetTrackTruckQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTrackTruckQuery, GetTrackTruckQueryVariables>;
export function useGetTrackTruckSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTrackTruckQuery, GetTrackTruckQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTrackTruckQuery | undefined, GetTrackTruckQueryVariables>;
export function useGetTrackTruckSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTrackTruckQuery, GetTrackTruckQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetTrackTruckQuery, GetTrackTruckQueryVariables>(GetTrackTruckDocument, options);
        }
export type GetTrackTruckQueryHookResult = ReturnType<typeof useGetTrackTruckQuery>;
export type GetTrackTruckLazyQueryHookResult = ReturnType<typeof useGetTrackTruckLazyQuery>;
export type GetTrackTruckSuspenseQueryHookResult = ReturnType<typeof useGetTrackTruckSuspenseQuery>;
export type GetTrackTruckQueryResult = ApolloReactCommon.QueryResult<GetTrackTruckQuery, GetTrackTruckQueryVariables>;