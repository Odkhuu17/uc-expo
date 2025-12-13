import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetVerificationsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetVerificationsQuery = { __typename?: 'Query', verifications: { __typename?: 'VerificationConnection', totalCount: number, edges: Array<{ __typename?: 'VerificationEdge', cursor: string, node?: { __typename?: 'Verification', id: string, status: string, targetId: string, targetType: string, comment?: string, field1?: string, field2?: string, field3?: string, field4?: string, field5?: string, userId: string, images?: Array<string>, createdAt: any, updatedAt: any, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }>, user: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, respondedBy?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string } } }>, nodes: Array<{ __typename?: 'Verification', id: string, status: string, targetId: string, targetType: string }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string, endCursor?: string } } };


export const GetVerificationsDocument = gql`
    query GetVerifications($first: Int, $after: String, $before: String, $last: Int, $offset: Int) {
  verifications(
    first: $first
    after: $after
    before: $before
    last: $last
    offset: $offset
  ) {
    edges {
      cursor
      node {
        id
        status
        targetId
        targetType
        comment
        field1
        field2
        field3
        field4
        field5
        userId
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
        respondedBy {
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
    nodes {
      id
      status
      targetId
      targetType
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
 * __useGetVerificationsQuery__
 *
 * To run a query within a React component, call `useGetVerificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVerificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVerificationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      last: // value for 'last'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetVerificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetVerificationsQuery, GetVerificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetVerificationsQuery, GetVerificationsQueryVariables>(GetVerificationsDocument, options);
      }
export function useGetVerificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetVerificationsQuery, GetVerificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetVerificationsQuery, GetVerificationsQueryVariables>(GetVerificationsDocument, options);
        }
// @ts-ignore
export function useGetVerificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetVerificationsQuery, GetVerificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetVerificationsQuery, GetVerificationsQueryVariables>;
export function useGetVerificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetVerificationsQuery, GetVerificationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GetVerificationsQuery | undefined, GetVerificationsQueryVariables>;
export function useGetVerificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetVerificationsQuery, GetVerificationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetVerificationsQuery, GetVerificationsQueryVariables>(GetVerificationsDocument, options);
        }
export type GetVerificationsQueryHookResult = ReturnType<typeof useGetVerificationsQuery>;
export type GetVerificationsLazyQueryHookResult = ReturnType<typeof useGetVerificationsLazyQuery>;
export type GetVerificationsSuspenseQueryHookResult = ReturnType<typeof useGetVerificationsSuspenseQuery>;
export type GetVerificationsQueryResult = ApolloReactCommon.QueryResult<GetVerificationsQuery, GetVerificationsQueryVariables>;