import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CloseOrderMutationVariables = Types.Exact<{
  number: Types.Scalars['String']['input'];
  mobile: Types.Scalars['String']['input'];
  clientMutationId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CloseOrderMutation = { __typename?: 'Mutation', closeOrder?: { __typename?: 'Order', id: string, number?: string, title?: string, description?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, vatIncluded?: boolean, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, data: any, audio?: string, video?: string, images?: Array<string>, createdAt: any, updatedAt: any, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }>, user?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } };


export const CloseOrderDocument = gql`
    mutation CloseOrder($number: String!, $mobile: String!, $clientMutationId: String) {
  closeOrder(
    input: {number: $number, mobile: $mobile, clientMutationId: $clientMutationId}
  ) {
    id
    number
    title
    description
    status
    published
    my
    requested
    subscribed
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
    `;
export type CloseOrderMutationFn = ApolloReactCommon.MutationFunction<CloseOrderMutation, CloseOrderMutationVariables>;

/**
 * __useCloseOrderMutation__
 *
 * To run a mutation, you first call `useCloseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeOrderMutation, { data, loading, error }] = useCloseOrderMutation({
 *   variables: {
 *      number: // value for 'number'
 *      mobile: // value for 'mobile'
 *      clientMutationId: // value for 'clientMutationId'
 *   },
 * });
 */
export function useCloseOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloseOrderMutation, CloseOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CloseOrderMutation, CloseOrderMutationVariables>(CloseOrderDocument, options);
      }
export type CloseOrderMutationHookResult = ReturnType<typeof useCloseOrderMutation>;
export type CloseOrderMutationResult = ApolloReactCommon.MutationResult<CloseOrderMutation>;
export type CloseOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<CloseOrderMutation, CloseOrderMutationVariables>;