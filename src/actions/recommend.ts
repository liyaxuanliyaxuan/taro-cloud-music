/*
 * @Date: 2020-11-15 10:57:19
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-15 11:10:12
 */
import * as actionTypes from '../constants/recommend'
import {getRecommendListRequest, getBannerRequest} from '../api/service'

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMENDLIST,
    data: data
})

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: data
})

export const getBannerList = (dispatch) =>{
    return (dispatch) =>{
        getBannerRequest().then(data=>{
            dispatch(changeBannerList(data.banners))
        }).catch(err=>console.log(err))
    }
}

export const getRecommendList = (dispatch) =>{
    return (dispatch) =>{
        getRecommendListRequest().then(data=>
            dispatch(changeRecommendList(data.result))    
        ).catch(err=>console.log(err))
    }
}