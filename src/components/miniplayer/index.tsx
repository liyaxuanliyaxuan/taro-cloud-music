/*
 * @Date: 2020-11-15 16:07:17
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-29 14:15:42
 */
import { ComponentClass } from 'react'
import Taro, {
    Component,
    Config,
    useState,
    useEffect
} from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtSwipeAction, AtSwitch } from "taro-ui"

import Audio from '../../api/audio'

import { AtButton } from 'taro-ui'
import './index.scss'

import '../../pages/static/font/iconfont.css'

export const MiniPlayer = (props) => {
    const [pauseState, setPauseState] = useState('playing')
    const { handelCancel } = { ...props }

    const handlePause = () => {
        if (Taro.$audio) {
            if (pauseState == 'paused') {
                setPauseState('playing')
                Taro.$audio.play()
            } else {
                setPauseState('paused')
                Taro.$audio.pause()
            }
        }
    }

    const handleDestroy = () => {
        Taro.$audio && Taro.$audio.destroy()
        Taro.$audio = null
        handelCancel()
    }




    return (<View className='mini-container'>


        {pauseState == 'paused' ?
            <Text className='iconfont play' onClick={handlePause}>&#xe80f;</Text> :
            <Text className='iconfont paused' onClick={handlePause}>&#xe7d2;</Text>}
        <Text onClick={handleDestroy} className='iconfont 取消 cancel'>&#xe610;</Text>

    </View>)

}





