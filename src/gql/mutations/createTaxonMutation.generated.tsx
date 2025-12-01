import type * as Types from '../graphql';

import { gql } from '@apollo/client';
import type * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type CreateTaxonMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  link: Types.Scalars['String']['input'];
  active?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  icon?: Types.InputMaybe<Types.Scalars['String']['input']>;
  parentCode?: Types.InputMaybe<Types.Scalars['String']['input']>;
  parentId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
  position?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  preferences?: Types.InputMaybe<Types.Scalars['JSON']['input']>;
  slug?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type CreateTaxonMutation = { __typename?: 'Mutation', createTaxon?: { __typename?: 'Taxon', id: string, code: string, name: string, link: string, icon?: string, slug: string, preferences?: any, hasChildren?: boolean, parentId?: string, createdAt: any, updatedAt: any, parent?: { __typename?: 'Taxon', id: string, code: string, name: string }, children?: Array<{ __typename?: 'Taxon', id: string, code: string, name: string }> } };


export const CreateTaxonDocument = gql`
    mutation CreateTaxon($code: String!, $name: String!, $link: String!, $active: Boolean, $icon: String, $parentCode: String, $parentId: ID, $position: Int, $preferences: JSON, $slug: String) {
  createTaxon(
    input: {code: $code, name: $name, link: $link, active: $active, icon: $icon, parentCode: $parentCode, parentId: $parentId, position: $position, preferences: $preferences, slug: $slug}
  ) {
    id
    code
    name
    link
    icon
    slug
    preferences
    hasChildren
    parentId
    parent {
      id
      code
      name
    }
    children {
      id
      code
      name
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateTaxonMutationFn = ApolloReactCommon.MutationFunction<CreateTaxonMutation, CreateTaxonMutationVariables>;

/**
 * __useCreateTaxonMutation__
 *
 * To run a mutation, you first call `useCreateTaxonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaxonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaxonMutation, { data, loading, error }] = useCreateTaxonMutation({
 *   variables: {
 *      code: // value for 'code'
 *      name: // value for 'name'
 *      link: // value for 'link'
 *      active: // value for 'active'
 *      icon: // value for 'icon'
 *      parentCode: // value for 'parentCode'
 *      parentId: // value for 'parentId'
 *      position: // value for 'position'
 *      preferences: // value for 'preferences'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCreateTaxonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaxonMutation, CreateTaxonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateTaxonMutation, CreateTaxonMutationVariables>(CreateTaxonDocument, options);
      }
export type CreateTaxonMutationHookResult = ReturnType<typeof useCreateTaxonMutation>;
export type CreateTaxonMutationResult = ApolloReactCommon.MutationResult<CreateTaxonMutation>;
export type CreateTaxonMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaxonMutation, CreateTaxonMutationVariables>;