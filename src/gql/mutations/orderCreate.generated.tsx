import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type OrderCreateMutationVariables = Types.Exact<{
  title?: Types.InputMaybe<Types.Scalars['String']['input']>;
  packageType?: Types.InputMaybe<Types.Scalars['String']['input']>;
  packageWeight?: Types.InputMaybe<Types.Scalars['String']['input']>;
  packageDimensions?: Types.InputMaybe<Types.Scalars['String']['input']>;
  price?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  senderName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  senderMobile?: Types.InputMaybe<Types.Scalars['String']['input']>;
  receiverName?: Types.InputMaybe<Types.Scalars['String']['input']>;
  receiverMobile?: Types.InputMaybe<Types.Scalars['String']['input']>;
  carType?: Types.InputMaybe<Types.Scalars['String']['input']>;
  carWeight?: Types.InputMaybe<Types.Scalars['String']['input']>;
  travelAt?: Types.InputMaybe<Types.Scalars['ISO8601DateTime']['input']>;
  travelDistance?: Types.InputMaybe<Types.Scalars['String']['input']>;
  travelDuration?: Types.InputMaybe<Types.Scalars['String']['input']>;
  originId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  destinationId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  published?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  images?: Types.InputMaybe<Array<Types.Scalars['Upload']['input']> | Types.Scalars['Upload']['input']>;
  audio?: Types.InputMaybe<Types.Scalars['Upload']['input']>;
  video?: Types.InputMaybe<Types.Scalars['Upload']['input']>;
  vatIncluded?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  data?: Types.InputMaybe<Types.Scalars['JSON']['input']>;
}>;


export type OrderCreateMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', id: string, number?: string, title?: string, packageType?: string, packageWeight?: string, packageDimensions?: string, price?: number, status?: string, published?: boolean, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, carType?: string, carWeight?: string, travelAt?: any, travelDistance?: string, travelDuration?: string, images?: Array<string>, audio?: string, video?: string, vatIncluded?: boolean, createdAt: any, updatedAt: any, origin?: { __typename?: 'Address', id: string, address1?: string, address2?: string, latitude?: string, longitude?: string, name?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, address1?: string, address2?: string, latitude?: string, longitude?: string, name?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, user?: { __typename?: 'User', id: string, email?: string, firstName?: string, lastName?: string } } };


export const OrderCreateDocument = gql`
    mutation orderCreate($title: String, $packageType: String, $packageWeight: String, $packageDimensions: String, $price: Float, $senderName: String, $senderMobile: String, $receiverName: String, $receiverMobile: String, $carType: String, $carWeight: String, $travelAt: ISO8601DateTime, $travelDistance: String, $travelDuration: String, $originId: ID, $destinationId: ID, $published: Boolean, $images: [Upload!], $audio: Upload, $video: Upload, $vatIncluded: Boolean, $data: JSON) {
  createOrder(
    input: {title: $title, packageType: $packageType, packageWeight: $packageWeight, packageDimensions: $packageDimensions, price: $price, senderName: $senderName, senderMobile: $senderMobile, receiverName: $receiverName, receiverMobile: $receiverMobile, carType: $carType, carWeight: $carWeight, travelAt: $travelAt, originId: $originId, destinationId: $destinationId, travelDistance: $travelDistance, travelDuration: $travelDuration, published: $published, images: $images, audio: $audio, video: $video, vatIncluded: $vatIncluded, data: $data}
  ) {
    id
    number
    title
    packageType
    packageWeight
    packageDimensions
    price
    status
    published
    senderName
    senderMobile
    receiverName
    receiverMobile
    carType
    carWeight
    travelAt
    travelDistance
    travelDuration
    images
    audio
    video
    vatIncluded
    origin {
      id
      address1
      address2
      latitude
      longitude
      name
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
      address1
      address2
      latitude
      longitude
      name
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
    user {
      id
      email
      firstName
      lastName
    }
    createdAt
    updatedAt
  }
}
    `;
export type OrderCreateMutationFn = ApolloReactCommon.MutationFunction<OrderCreateMutation, OrderCreateMutationVariables>;

/**
 * __useOrderCreateMutation__
 *
 * To run a mutation, you first call `useOrderCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderCreateMutation, { data, loading, error }] = useOrderCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      packageType: // value for 'packageType'
 *      packageWeight: // value for 'packageWeight'
 *      packageDimensions: // value for 'packageDimensions'
 *      price: // value for 'price'
 *      senderName: // value for 'senderName'
 *      senderMobile: // value for 'senderMobile'
 *      receiverName: // value for 'receiverName'
 *      receiverMobile: // value for 'receiverMobile'
 *      carType: // value for 'carType'
 *      carWeight: // value for 'carWeight'
 *      travelAt: // value for 'travelAt'
 *      travelDistance: // value for 'travelDistance'
 *      travelDuration: // value for 'travelDuration'
 *      originId: // value for 'originId'
 *      destinationId: // value for 'destinationId'
 *      published: // value for 'published'
 *      images: // value for 'images'
 *      audio: // value for 'audio'
 *      video: // value for 'video'
 *      vatIncluded: // value for 'vatIncluded'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useOrderCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OrderCreateMutation, OrderCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<OrderCreateMutation, OrderCreateMutationVariables>(OrderCreateDocument, options);
      }
export type OrderCreateMutationHookResult = ReturnType<typeof useOrderCreateMutation>;
export type OrderCreateMutationResult = ApolloReactCommon.MutationResult<OrderCreateMutation>;
export type OrderCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<OrderCreateMutation, OrderCreateMutationVariables>;