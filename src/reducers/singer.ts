/*
 * @Date: 2020-11-15 16:54:14
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-29 16:47:20
 */
import * as actionTypes from '../constants/singers'

const INITIAL_STATE = {
  singerList: [],
  pageCount: 0,
  loading: true
}

export default function singerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.data
      }
    case actionTypes.CHANGE_SINGER_LIST:
      return {
        ...state,
        singerList: action.data

      }
    case actionTypes.CHNEG_LOADING:
      return {
        ...state,
        loading: action.data
      }
    default:
      return state
  }
}

