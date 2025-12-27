import type * as Types from '../graphql';

import { gql } from '@apollo/client';
export type OrderFragmentFragment = { __typename?: 'Order', id: string, number?: string, title?: string, status?: string, published?: boolean, my?: boolean, requested?: boolean, packageType?: string, price?: number, carType?: string, carWeight?: string, senderName?: string, senderMobile?: string, receiverName?: string, receiverMobile?: string, travelAt?: any, images?: Array<string>, subscribed: boolean, createdAt: any, updatedAt: any, origin?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } }, destination?: { __typename?: 'Address', id: string, name?: string, address1?: string, address2?: string, latitude?: string, longitude?: string, country?: { __typename?: 'Country', id: string, name: string }, state?: { __typename?: 'State', id: string, name: string }, district?: { __typename?: 'District', id: string, name: string }, quarter?: { __typename?: 'Quarter', id: string, name: string } } };

export const OrderFragmentFragmentDoc = gql`
    fragment OrderFragment on Order {
  id
  number
  title
  status
  published
  my
  requested
  packageType
  price
  carType
  carWeight
  senderName
  senderMobile
  receiverName
  receiverMobile
  travelAt
  images
  subscribed
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
    `;