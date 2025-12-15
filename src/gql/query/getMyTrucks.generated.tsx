import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetMyTrucksQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyTrucksQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, trucks: Array<{ __typename?: 'Truck', id: string, plateNumber?: string, serial?: string, weight?: number, netWeight?: number, importedDate?: any, mark?: string, model?: string, manufacturedDate?: any, verified: boolean, verifiedAt?: any, createdAt: any, updatedAt: any, taxon?: { __typename?: 'Taxon', id: string, name: string, code: string, icon?: string, link: string }, verifications?: { __typename?: 'VerificationConnection', edges: Array<{ __typename?: 'VerificationEdge', node?: { __typename?: 'Verification', id: string, status: string, comment?: string, field1?: string, field2?: string, field3?: string, field4?: string, field5?: string, createdAt: any, updatedAt: any } }> } }> } };


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
      mark
      model
      manufacturedDate
      taxon {
        id
        name
        code
        icon
        link
      }
      verified
      verifiedAt
      verifications(filter: {status: {eq: "pending"}}) {
        edges {
          node {
            id
            status
            comment
            field1
            field2
            field3
            field4
            field5
            createdAt
            updatedAt
          }
        }
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
// @ts-ignore
export function useGetMyTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMyTrucksQuery, GetMyTrucksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyTrucksQuery, GetMyTrucksQueryVariables>;
export function useGetMyTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyTrucksQuery, GetMyTrucksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetMyTrucksQuery | undefined, GetMyTrucksQueryVariables>;
export function useGetMyTrucksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetMyTrucksQuery, GetMyTrucksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMyTrucksQuery, GetMyTrucksQueryVariables>(GetMyTrucksDocument, options);
        }
export type GetMyTrucksQueryHookResult = ReturnType<typeof useGetMyTrucksQuery>;
export type GetMyTrucksLazyQueryHookResult = ReturnType<typeof useGetMyTrucksLazyQuery>;
export type GetMyTrucksSuspenseQueryHookResult = ReturnType<typeof useGetMyTrucksSuspenseQuery>;
export type GetMyTrucksQueryResult = ApolloReactCommon.QueryResult<GetMyTrucksQuery, GetMyTrucksQueryVariables>;