/*
 * @Date: 2020-11-15 19:06:35
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-28 22:14:27
 */
import * as actionTypes from '../constants/rank'
import {getRankListRequest} from '../api/service'

export const changeRankList = (data)=>({
    type: actionTypes.CHANGE_RANKLIST,
    data
})

export const changeLoading = (data)=>({
    type: actionTypes.CHANGE_LOADING,
    data
})

export const getRankList = ()=>{
    return (dispatch)=>{
        getRankListRequest().then(data=>{
            let list = data && data.list
            dispatch(changeRankList(list))
            dispatch(changeLoading(false))
        }).then(err=>console.log(err))
    }
}