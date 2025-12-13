import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, email?: string, mobile?: string, gender?: string, nickName?: string, registerNum?: string, role?: string, isAdmin: boolean, subscribed?: boolean, createdAt: any, updatedAt: any, roles?: Array<{ __typename?: 'Role', id: string, name?: string, createdAt: any, updatedAt: any }> } };


export const GetUserDocument = gql`
    query GetUser {
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
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
// @ts-ignore
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserQuery, GetUserQueryVariables>;
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetUserQuery | undefined, GetUserQueryVariables>;
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;