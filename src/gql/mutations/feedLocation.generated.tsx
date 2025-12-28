import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type FeedLocationMutationVariables = Types.Exact<{
  truckId: Types.Scalars['ID']['input'];
  latitude: Types.Scalars['Float']['input'];
  longitude: Types.Scalars['Float']['input'];
  deviceToken?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type FeedLocationMutation = { __typename?: 'Mutation', feedLocation?: { __typename?: 'TruckTrack', id: string } };


export const FeedLocationDocument = gql`
    mutation FeedLocation($truckId: ID!, $latitude: Float!, $longitude: Float!, $deviceToken: String) {
  feedLocation(
    input: {truckId: $truckId, latitude: $latitude, longitude: $longitude, deviceToken: $deviceToken}
  ) {
    id
  }
}
    `;
export type FeedLocationMutationFn = ApolloReactCommon.MutationFunction<FeedLocationMutation, FeedLocationMutationVariables>;

/**
 * __useFeedLocationMutation__
 *
 * To run a mutation, you first call `useFeedLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeedLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [feedLocationMutation, { data, loading, error }] = useFeedLocationMutation({
 *   variables: {
 *      truckId: // value for 'truckId'
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      deviceToken: // value for 'deviceToken'
 *   },
 * });
 */
export function useFeedLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FeedLocationMutation, FeedLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<FeedLocationMutation, FeedLocationMutationVariables>(FeedLocationDocument, options);
      }
export type FeedLocationMutationHookResult = ReturnType<typeof useFeedLocationMutation>;
export type FeedLocationMutationResult = ApolloReactCommon.MutationResult<FeedLocationMutation>;
export type FeedLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<FeedLocationMutation, FeedLocationMutationVariables>;