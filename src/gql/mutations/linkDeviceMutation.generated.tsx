import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type LinkDeviceMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  deviceType?: Types.InputMaybe<Types.Scalars['String']['input']>;
  deviceModel?: Types.InputMaybe<Types.Scalars['String']['input']>;
  deviceOs?: Types.InputMaybe<Types.Scalars['String']['input']>;
  country?: Types.InputMaybe<Types.Scalars['String']['input']>;
  subscribed?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type LinkDeviceMutation = { __typename?: 'Mutation', linkDevice: { __typename?: 'Device', id: string } };


export const LinkDeviceDocument = gql`
    mutation LinkDevice($token: String!, $deviceType: String, $deviceModel: String, $deviceOs: String, $country: String, $subscribed: Boolean) {
  linkDevice(
    input: {token: $token, deviceType: $deviceType, deviceModel: $deviceModel, deviceOs: $deviceOs, country: $country, subscribed: $subscribed}
  ) {
    id
  }
}
    `;
export type LinkDeviceMutationFn = ApolloReactCommon.MutationFunction<LinkDeviceMutation, LinkDeviceMutationVariables>;

/**
 * __useLinkDeviceMutation__
 *
 * To run a mutation, you first call `useLinkDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkDeviceMutation, { data, loading, error }] = useLinkDeviceMutation({
 *   variables: {
 *      token: // value for 'token'
 *      deviceType: // value for 'deviceType'
 *      deviceModel: // value for 'deviceModel'
 *      deviceOs: // value for 'deviceOs'
 *      country: // value for 'country'
 *      subscribed: // value for 'subscribed'
 *   },
 * });
 */
export function useLinkDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LinkDeviceMutation, LinkDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LinkDeviceMutation, LinkDeviceMutationVariables>(LinkDeviceDocument, options);
      }
export type LinkDeviceMutationHookResult = ReturnType<typeof useLinkDeviceMutation>;
export type LinkDeviceMutationResult = ApolloReactCommon.MutationResult<LinkDeviceMutation>;
export type LinkDeviceMutationOptions = ApolloReactCommon.BaseMutationOptions<LinkDeviceMutation, LinkDeviceMutationVariables>;