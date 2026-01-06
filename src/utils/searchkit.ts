import Client from '@searchkit/instantsearch-client';
import Searchkit from 'searchkit';

const sk = new Searchkit({
  connection: {
    host: `https://elastic:ph58b4d26fb4a@es.caak.mn/supp_trucks`,
  },
  search_settings: {
    search_attributes: [''],
    result_attributes: ['*'],
    sorting: {
      default: {
        field: 'tracked_at',
        order: 'asc',
      },
    },
  },
});

const searchClient = Client(sk, {});

export default searchClient;
