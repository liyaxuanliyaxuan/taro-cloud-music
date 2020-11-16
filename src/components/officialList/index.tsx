/*
 * @Date: 2020-11-15 16:07:17
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 18:56:01
 */
import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtSwipeAction, AtSwitch } from "taro-ui"


import { AtButton } from 'taro-ui'
import './index.scss'



export const OfficialList = (props) => {
    const { list } = { ...props }
    const { handleClick } = { ...props }

    const renderSongList = (list) => {
        return (<View className='song-list'>
            {
                list && list.map((item, index) => (
                    <View key={item.first} className='list-item'>
                        <Text className='song-name'>{index+1 +'.'+ item.first}</Text>
                        <Text className='writer-name'>{item.second}</Text>
                    </View>))
            }
        </View>)
    }

    return <View className='official-list'>
        {
            list && list.map(item => (<View key={item.id} onClick={() => handleClick(item.id)} className='official-item'>
                <View className='img-wrapper'>
                    <Image className='cover' src={item.coverImgUrl} />
                </View>
                <View className='song-list'>
                    {renderSongList(item.tracks)}
                </View>

            </View>))
        }

    </View>

}





