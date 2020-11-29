/*
 * @Date: 2020-11-15 21:46:16
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-29 15:18:37
 */
import * as actionTypes from '../constants/player'
import { getSongRequest, getLyricRequest, getSongDetailRequest } from '../api/service'

export const changeSong = (data)=>({
    type:actionTypes.CHANGE_PLAYER,
    data
})
//获取音乐的url
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
//获取歌词
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

export const changeSongInfo = (data)=>({
    type: actionTypes.CHANGE_SONGINFO,
    data
})
//获取歌曲的信息
export const getSongInfo = (id)=>{
    return (dispatch)=>{
        getSongDetailRequest(id).then(
            res=>{
                let data = res.songs[0]
                dispatch(changeSongInfo(data))
            }
        )
    }
}

export const changeAudio = (data)=>({
    type: actionTypes.CHANGE_AUDIO,
    data
})

export const changeCurSongId = (data) => ({
    type: actionTypes.CHANGE_CURSONGID,
    data
})
export const changeSongIdList = (data) => ({
    type: actionTypes.CHANGE_SONGIDLIST,
    data
})