import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type UpdateOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  carType?: Types.InputMaybe<Types.Scalars['String']['input']>;
  carWeight?: Types.InputMaybe<Types.Scalars['String']['input']>;
  destinationId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  originId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  packageDimensions?: Types.InputMaybe<Types.Scalars['String']['input']>;
  packageType?: Types.InputMaybe<Types.Scalars['String']['input']>;
  packageWeight?: Types.InputMaybe<Types.Scalars['String']['input']>;
  price?: Types.InputMaybe<Types.Scalars['String']['input']>;
  published?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  receiverMobile?: Types.InputMaybe<Types.Scalars['String']['input']>;
  receiverName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  senderMobile?: Types.InputMaybe<Types.Scalars['String']['input']>;
  senderName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  status?: Types.InputMaybe<Types.Scalars['String']['input']>;
  title?: Types.InputMaybe<Types.Scalars['String']['input']>;
  travelAt?: Types.InputMaybe<Types.Scalars['ISO8601DateTime']['input']>;
  travelDistance?: Types.InputMaybe<Types.Scalars['String']['input']>;
  travelDuration?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder?: { __typename?: 'Order', id: string, number?: string, title?: string, description?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, subscribed: boolean, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, vatIncluded?: boolean, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, data: any, audio?: string, video?: string, images?: Array<string>, createdAt: any, updatedAt: any, imageObjects?: Array<{ __typename?: 'ImageObject', id: string, url: string, fileName: string, recordId: number, recordType: string }>, user?: { __typename?: 'User', id: string, firstName?: string, lastName?: string, nickName?: string, mobile?: string, email?: string }, origin?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } }, destination?: { __typename?: 'UserAddress', id: string, address: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } } } };


export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: ID!, $carType: String, $carWeight: String, $destinationId: ID, $originId: ID, $packageDimensions: String, $packageType: String, $packageWeight: String, $price: String, $published: Boolean, $receiverMobile: String, $receiverName: String, $senderMobile: String, $senderName: String, $status: String, $title: String, $travelAt: ISO8601DateTime, $travelDistance: String, $travelDuration: String) {
  updateOrder(
    input: {id: $id, carType: $carType, carWeight: $carWeight, destinationId: $destinationId, originId: $originId, packageDimensions: $packageDimensions, packageType: $packageType, packageWeight: $packageWeight, price: $price, published: $published, receiverMobile: $receiverMobile, receiverName: $receiverName, senderMobile: $senderMobile, senderName: $senderName, status: $status, title: $title, travelAt: $travelAt, travelDistance: $travelDistance, travelDuration: $travelDuration}
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
    createdAt
    updatedAt
  }
}
    `;
export type UpdateOrderMutationFn = ApolloReactCommon.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      carType: // value for 'carType'
 *      carWeight: // value for 'carWeight'
 *      destinationId: // value for 'destinationId'
 *      originId: // value for 'originId'
 *      packageDimensions: // value for 'packageDimensions'
 *      packageType: // value for 'packageType'
 *      packageWeight: // value for 'packageWeight'
 *      price: // value for 'price'
 *      published: // value for 'published'
 *      receiverMobile: // value for 'receiverMobile'
 *      receiverName: // value for 'receiverName'
 *      senderMobile: // value for 'senderMobile'
 *      senderName: // value for 'senderName'
 *      status: // value for 'status'
 *      title: // value for 'title'
 *      travelAt: // value for 'travelAt'
 *      travelDistance: // value for 'travelDistance'
 *      travelDuration: // value for 'travelDuration'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = ApolloReactCommon.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;