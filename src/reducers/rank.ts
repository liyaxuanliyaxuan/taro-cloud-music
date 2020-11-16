/*
 * @Date: 2020-11-15 19:06:56
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-15 19:20:45
 */
import * as actionTypes from '../constants/rank'

const INITIAL_STATE = {
  rankList:[],
 
}

export default function rankReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CHANGE_RANKLIST:
      return {
        ...state,
        rankList: action.data
      }

     default:
       return state
  }
}
