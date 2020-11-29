/*
 * @Date: 2020-11-15 21:47:08
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-29 15:21:30
 */
import * as actionTypes from '../constants/player'

const INITIAL_STATE = {
  song: {},//音频
  lyric: '',
  songInfo: {},

  audio: {},//播放的音频实体,
  curSongId: '',
  songIdList: []

}

export default function playerReducer(state = INITIAL_STATE, action) {
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
      return {
        ...state,
        songInfo: action.data
      }
    case actionTypes.CHANGE_AUDIO:
      return {
        ...state,
        audio: action.data
      }
    case actionTypes.CHANGE_SONGIDLIST:
      return {
        ...state,
        songIdList: action.data

      }
    case actionTypes.CHANGE_CURSONGID:
      return {
        ...state,
        curSongId: action.data
      }

    default:
      return state
  }
}
