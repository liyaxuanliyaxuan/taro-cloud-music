/*
 * @Date: 2020-11-15 11:10:39
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-15 11:13:21
 */
import * as actionTypes from '../constants/recommend'

const INITIAL_STATE = {
  recommendList:[],
  bannerList:[]
}

export default function recommendReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return {
        ...state,
        bannerList: action.data
      }
     case actionTypes.CHANGE_RECOMMENDLIST:
       return {
         ...state,
         recommendList: action.data
         
       }
     default:
       return state
  }
}
