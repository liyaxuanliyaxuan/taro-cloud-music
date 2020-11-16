/*
 * @Date: 2020-11-14 19:24:09
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 21:00:43
 */
import { combineReducers } from 'redux'
import counter from './counter'
import recommendReducer from './recommend'
import singerReducer from './singer'
import rankReducer from './rank'
import playlistReducer from './playlist'
import playerReducer from './player'
import introduceReducer  from './introduce'

export default combineReducers({
  counter,
  recommendReducer,
  singerReducer,
  rankReducer,
  playlistReducer,
  playerReducer,
  introduceReducer
})
