import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import { AtSwipeAction, AtSwitch } from "taro-ui"


import { AtButton } from 'taro-ui'
import './index.scss'


export const GlobalList = (props)=> {
    const {list} = {...props}
    const { handleClick } = {...props}

    return<View className='global-list'>
      {
         list && list.map(item=>(<View onClick={()=>handleClick(item.id)} className='global-item'>
              <View className='img-wrapper'>
                  <Image className='cover' src={item.coverImgUrl as string}></Image>
              </View>
          </View>))
      }  
    </View>

}