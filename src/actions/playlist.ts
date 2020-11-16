/*
 * @Date: 2020-11-15 21:46:08
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 08:09:50
 */
import * as actionTypes from '../constants/playlist'
import { getPlayListRequest } from '../api/service'


export const changePlaylist = data =>({
    type:actionTypes.CHANGE_PLAYLIST,
    data
})

export const getPlaylist = (id) => {
    return (dispatch)=>{
        getPlayListRequest(id).then(res=>{
            let data = res.playlist
            dispatch(changePlaylist(data))
        }).then(err=>console.log(err))
    }
}