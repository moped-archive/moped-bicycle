// eslint-disable-next-line
import React from 'react';
import Bicycle from 'bicycle/client';
// eslint-disable-next-line
import {Provider} from 'react-bicycle';
import request from 'moped-runtime/lib/globals/request';

const client = new Bicycle(
  {
    send(message) {
      return request('POST', '/bicycle', {json: message}).getBody('utf8').then(JSON.parse);
    },
  },
  undefined, // optionally prepare on the server and pass it in here
  // keep fetched queries locally for up to 1 minutes
  {cacheTimeout: 60 * 1000},
);
// This can be useful for debugging
window.CLIENT = client;

export {client};
export function defineOptimisticUpdaters(updaters) {
  client.defineOptimisticUpdaters(updaters);
}
export default (props) => {
  return (
    <Provider client={client}>
      {props.children}
    </Provider>
  );
};
