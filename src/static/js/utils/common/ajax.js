/* eslint-disable camelcase */

import axios from 'axios';
import { isObject, isString } from './tools';

const $get = options => axios({ ...options, method: 'get' });

const $post = options => axios({ ...options, method: 'post' });

const $delete = options => axios({ ...options, method: 'delete' });

const $put = options => axios({ ...options, method: 'put' });

export { $get, $post, $delete, $put };
export default {
    $get, $post, $delete, $put
};
