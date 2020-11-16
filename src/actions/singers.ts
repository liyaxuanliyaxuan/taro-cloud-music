/*
 * @Date: 2020-11-15 16:03:34
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-15 16:53:52
 */
import * as actionTypes from '../constants/singers'
import {getHotSingerListRequest, getSingerListRequest} from '../api/service'

export const changeSingerList = (data)=>{
    return{
        type: actionTypes.CHANGE_SINGER_LIST,
        data
    }
}

export const changePageCount = (data)=>{
    return {
        type: actionTypes.CHANGE_PAGE_COUNT,
        data
    }
}

export const getInitHotSingerList = ()=>{
    return (dispatch)=>{
        getHotSingerListRequest(0).then(res=>{
            let data = res.artists
            dispatch(changeSingerList(data))

        }).catch(err=>console.log(err))
    }
}
export const getMoreHotSingerList = ()=>{
    return (dispatch, getState)=>{
        //getHotSingerListRequest()
    }
}

export const getInitSingerList = (category, alpha)=>{
    return (dispatch, getState)=>{
        getSingerListRequest(category, alpha, 0).then(res=>{
            let data = res.artists
            dispatch(changeSingerList(data))
            dispatch(changePageCount(0))
        }).catch(err=>console.log(err))
    }
}

export const getMoreSingerList = (category, alpha)=>{
    return (dispatch, getState)=>{
        //getSingerListRequest(category, alpha, )
    }
}