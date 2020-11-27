/*
 * @Date: 2020-11-15 16:07:17
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-27 13:23:42
 */
import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtSwipeAction, AtSwitch } from "taro-ui"


import { AtButton } from 'taro-ui'
import './index.scss'



export const LyricList = (props) => {

    const {list, top} = {...props}

    return <View className='list-container'>
        <ScrollView 
        scrollTop={top}
        enableFlex={true} 
        scrollY={true}
        className='lyric-list'>
        {
            list && list.map((item, index) => {
                return (
                    <View 
                    key={item.time}
                    className='lyric-line'>{item.txt}</View>
                )
            })
        }
        </ScrollView>
    </View>

}





