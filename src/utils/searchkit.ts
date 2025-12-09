import Client from '@searchkit/instantsearch-client';
import Searchkit from 'searchkit';

const sk = new Searchkit({
  connection: {
    host: `https://elastic:ph58b4d26fb4a@es.caak.mn`,
  },
  search_settings: {
    search_attributes: [''],
    result_attributes: ['*'],
    filter_attributes: [
      { attribute: 'truck.id', field: 'truck.id', type: 'string' },
    ],
    geo_attribute: 'location',
  },
});

const searchClient = Client(sk);

// Helper to create a search client with truck.id filter
export const createTruckFilteredClient = (truckId: string) => {
  return {
    ...searchClient,
    search(requests: any[]) {
      const modifiedRequests = requests.map(request => ({
        ...request,
        params: {
          ...request.params,
          filters: `truck.id:"${truckId}"`,
          sort: 'createdAt:desc',
        },
      }));
      return searchClient.search(modifiedRequests);
    },
  };
};

export default searchClient;
