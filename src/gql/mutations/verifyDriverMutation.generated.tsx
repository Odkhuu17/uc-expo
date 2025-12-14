import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type VerifyDriverMutationVariables = Types.Exact<{
  driverLicense: Types.Scalars['Upload']['input'];
  passport: Types.Scalars['Upload']['input'];
  passportBack: Types.Scalars['Upload']['input'];
  selfie: Types.Scalars['Upload']['input'];
}>;


export type VerifyDriverMutation = { __typename?: 'Mutation', verifyDriver?: { __typename?: 'Verification', id: string } };


export const VerifyDriverDocument = gql`
    mutation VerifyDriver($driverLicense: Upload!, $passport: Upload!, $passportBack: Upload!, $selfie: Upload!) {
  verifyDriver(
    input: {driverLicense: $driverLicense, passport: $passport, passportBack: $passportBack, selfie: $selfie}
  ) {
    id
  }
}
    `;
export type VerifyDriverMutationFn = ApolloReactCommon.MutationFunction<VerifyDriverMutation, VerifyDriverMutationVariables>;

/**
 * __useVerifyDriverMutation__
 *
 * To run a mutation, you first call `useVerifyDriverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyDriverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyDriverMutation, { data, loading, error }] = useVerifyDriverMutation({
 *   variables: {
 *      driverLicense: // value for 'driverLicense'
 *      passport: // value for 'passport'
 *      passportBack: // value for 'passportBack'
 *      selfie: // value for 'selfie'
 *   },
 * });
 */
export function useVerifyDriverMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyDriverMutation, VerifyDriverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyDriverMutation, VerifyDriverMutationVariables>(VerifyDriverDocument, options);
      }
export type VerifyDriverMutationHookResult = ReturnType<typeof useVerifyDriverMutation>;
export type VerifyDriverMutationResult = ApolloReactCommon.MutationResult<VerifyDriverMutation>;
export type VerifyDriverMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyDriverMutation, VerifyDriverMutationVariables>;