/*
 * WARNING!
 *
 * This file was generated by the following autogen template:
 *
 * src/redux/modules/appEpics.ts.hbs
 *
 * Do not modify, as any changes will be overwritten!
 */

import { combineEpics } from 'redux-observable';
import { epic as auth } from './auth';
import { epic as users } from './users';

export const appEpics = combineEpics(
  auth,
  users,
);