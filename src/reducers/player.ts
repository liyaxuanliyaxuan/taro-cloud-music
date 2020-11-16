/*
 * @Date: 2020-11-15 21:47:08
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 11:36:20
 */
import * as actionTypes from '../constants/player'

const INITIAL_STATE = {
  song:{},
  lyric:[]
 
}

export default function playerReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PLAYER:
      return {
        ...state,
        song: action.data
      }
    case actionTypes.CHANGE_LYRIC:
      return {
          ...state,
          lyric: action.data
      }

     default:
       return state
  }
}
