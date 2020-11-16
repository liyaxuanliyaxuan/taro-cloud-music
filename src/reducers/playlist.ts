/*
 * @Date: 2020-11-15 21:47:16
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 09:45:21
 */
import * as actionTypes from '../constants/playlist'

const INITIAL_STATE = {
  playlist:{},
 
}

export default function playlistReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PLAYLIST:
      return {
        ...state,
        playlist: action.data
      }

     default:
       return state
  }
}
