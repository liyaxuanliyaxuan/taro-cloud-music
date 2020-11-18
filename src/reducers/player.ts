/*
 * @Date: 2020-11-15 21:47:08
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-17 13:48:18
 */
import * as actionTypes from '../constants/player'

const INITIAL_STATE = {
  song:{},//音频
  lyric:[],
  songInfo:{}
 
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
      case actionTypes.CHANGE_SONGINFO:
        return{
          ...state,
          songInfo: action.data
        }

     default:
       return state
  }
}
