/*
 * @Date: 2020-11-15 21:46:16
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 11:40:56
 */
import * as actionTypes from '../constants/player'
import { getSongRequest, getLyricRequest } from '../api/service'

export const changeSong = (data)=>({
    type:actionTypes.CHANGE_PLAYER,
    data
})

export const getSong = (id)=>{
    return (dispatch)=>{
        getSongRequest(id).then(res=>{
            let data = res.data[0]
            dispatch(changeSong(data))
        }).then(err=>console.log(err))
    }
}

export const changeLyric = (data)=>({
    type: actionTypes.CHANGE_LYRIC,
    data
})

export const getLyric = (id)=>{
    return (dispatch)=>{
        getLyricRequest(id).then(
            res=>{
                let data = res.lrc.lyric
                dispatch(changeLyric(data))
            }
        ).catch(err=>console.log(err))
    }
}