/*
 * @Date: 2020-11-15 21:46:26
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 21:32:08
 */
import * as actionTypes from '../constants/introduce'
import { getSingerSongRequest } from '../api/service'

export const changeSingerSong = data=> ({
    type: actionTypes.CHANGE_SINGERSONG,
    data
})
export const changeArtist = data=> ({
    type: actionTypes.CHANGE_ARTIST,
    data
})
export const getSingerSong = id =>{
    return (dispatch)=>{
        getSingerSongRequest(id).then(res=>{
            let dataA = res.artist
            let dataS = res.hotSongs
            dispatch(changeArtist(dataA))
            dispatch(changeSingerSong(dataS))
        }).then(err=>console.log(err))
    }
}