/*
 * @Date: 2020-11-14 19:24:09
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-26 19:15:39
 */
import { combineReducers } from 'redux'
import recommendReducer from './recommend'
import singerReducer from './singer'
import rankReducer from './rank'
import playlistReducer from './playlist'
import playerReducer from './player'
import introduceReducer  from './introduce'

export default combineReducers({
  recommendReducer,
  singerReducer,
  rankReducer,
  playlistReducer,
  playerReducer,
  introduceReducer
})
