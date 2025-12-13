import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetTruckQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetTruckQuery = { __typename?: 'Query', truck?: { __typename?: 'Truck', id: string, plateNumber?: string, serial?: string, weight?: number, netWeight?: number, importedDate?: any, manufacturedDate?: any, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email?: string, firstName?: string, lastName?: string }, currentTrack?: { __typename?: 'TruckTrack', id: string, latitude?: number, longitude?: number, createdAt: any } } };


export const GetTruckDocument = gql`
    query GetTruck($id: ID!) {
  truck(id: $id) {
    id
    plateNumber
    serial
    weight
    netWeight
    importedDate
    manufacturedDate
    user {
      id
      email
      firstName
      lastName
    }
    currentTrack {
      id
      latitude
      longitude
      createdAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTruckQuery__
 *
 * To run a query within a React component, call `useGetTruckQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTruckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTruckQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTruckQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetTruckQuery, GetTruckQueryVariables> & ({ variables: GetTruckQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetTruckQuery, GetTruckQueryVariables>(GetTruckDocument, options);
      }
export function useGetTruckLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTruckQuery, GetTruckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetTruckQuery, GetTruckQueryVariables>(GetTruckDocument, options);
        }
// @ts-ignore
export function useGetTruckSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetTruckQuery, GetTruckQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTruckQuery, GetTruckQueryVariables>;
export function useGetTruckSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTruckQuery, GetTruckQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetTruckQuery | undefined, GetTruckQueryVariables>;
export function useGetTruckSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetTruckQuery, GetTruckQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetTruckQuery, GetTruckQueryVariables>(GetTruckDocument, options);
        }
export type GetTruckQueryHookResult = ReturnType<typeof useGetTruckQuery>;
export type GetTruckLazyQueryHookResult = ReturnType<typeof useGetTruckLazyQuery>;
export type GetTruckSuspenseQueryHookResult = ReturnType<typeof useGetTruckSuspenseQuery>;
export type GetTruckQueryResult = ApolloReactCommon.QueryResult<GetTruckQuery, GetTruckQueryVariables>;