import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMyTrucksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyTrucksQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, trucks: Array<{ __typename?: 'Truck', id: string, plateNumber?: string, serial?: string, weight?: number, netWeight?: number, importedDate?: any, manufacturedDate?: any, createdAt: any, updatedAt: any, mark: { __typename?: 'Mark', id: string, name: string, code: string }, model: { __typename?: 'Model', id: string, name: string, code: string, mark: { __typename?: 'Mark', id: string, name: string, code: string } }, currentTrack?: { __typename?: 'TruckTrack', id: string, latitude?: number, longitude?: number, createdAt: any } }> } };


export const GetMyTrucksDocument = gql`
    query GetMyTrucks {
  me {
    id
    trucks {
      id
      plateNumber
      serial
      weight
      netWeight
      importedDate
      manufacturedDate
      mark {
        id
        name
        code
      }
      model {
        id
        name
        code
        mark {
          id
          name
          code
        }
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
}
    `;

/**
 * __useGetMyTrucksQuery__
 *
 * To run a query within a React component, call `useGetMyTrucksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTrucksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTrucksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTrucksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyTrucksQuery, GetMyTrucksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMyTrucksQuery, GetMyTrucksQueryVariables>(GetMyTrucksDocument, options);
      }
export function useGetMyTrucksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyTrucksQuery, GetMyTrucksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMyTrucksQuery, GetMyTrucksQueryVariables>(GetMyTrucksDocument, options);
        }
export function useGetMyTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyTrucksQuery, GetMyTrucksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyTrucksQuery, GetMyTrucksQueryVariables>(GetMyTrucksDocument, options);
        }
export type GetMyTrucksQueryHookResult = ReturnType<typeof useGetMyTrucksQuery>;
export type GetMyTrucksLazyQueryHookResult = ReturnType<typeof useGetMyTrucksLazyQuery>;
export type GetMyTrucksSuspenseQueryHookResult = ReturnType<typeof useGetMyTrucksSuspenseQuery>;
export type GetMyTrucksQueryResult = ApolloReactCommon.QueryResult<GetMyTrucksQuery, GetMyTrucksQueryVariables>;