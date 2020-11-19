/*
 * @Date: 2020-11-15 16:07:17
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-19 21:50:27
 */
import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtSwipeAction, AtSwitch } from "taro-ui"

import Audio from '../../api/audio'

import { AtButton } from 'taro-ui'
import './index.scss'



export const MiniPlayer = (props) => {
    const handlePause = ()=>{
        Taro.$audio && Taro.$audio.pause()
    }
    const handleRedirect = ()=>{
        Taro.navigateTo({
            url:'/pages/player/index?fromMini=true'
        })
    }
    const handleStop = ()=>{
        Taro.$audio && Taro.$audio.stop()
    }
    const handleDestroy = ()=>{
        Taro.$audio && Taro.$audio.destroy()
        Taro.$audio = null
    }
    const handleSwitch = ()=>{
        Taro.$audio && Taro.$audio.destroy()
        Taro.$audio = Audio({url:'https://music.163.com/song/media/outer/url?id=id.mp3'})
        Taro.$audio.play()
    }
    
   return (<View className='mini-container'>
       <AtButton onClick={handleSwitch}>切歌</AtButton>
       <AtButton onClick={handleRedirect}>跳转</AtButton>
       <AtButton onClick={handlePause}>暂停</AtButton>
       <AtButton onClick={handleStop}>停止</AtButton>
       <AtButton onClick={handleDestroy}>取消</AtButton>
       
   </View>)

}





