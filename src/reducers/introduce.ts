/*
 * @Date: 2020-11-15 19:06:56
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 21:42:27
 */
import * as actionTypes from '../constants/introduce'

const INITIAL_STATE = {
    artist: {},
    hotSongs: []

}

export default function introduceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.CHANGE_SINGERSONG:
            return {
                ...state,
                hotSongs: action.data
            }
        case actionTypes.CHANGE_ARTIST:
            return {
                ...state,
                artist: action.data
            }

        default:
            return state
    }
}
