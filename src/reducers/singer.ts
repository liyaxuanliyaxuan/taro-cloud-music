/*
 * @Date: 2020-11-15 16:54:14
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-15 17:21:06
 */
import * as actionTypes from '../constants/singers'

const INITIAL_STATE = {
    singerList:[],
    pageCount:0
  }
  
  export default function singerReducer (state = INITIAL_STATE, action) {
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
       default:
         return state
    }
  }
  
