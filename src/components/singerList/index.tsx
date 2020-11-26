/*
 * @Date: 2020-11-15 16:07:17
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-25 09:16:57
 */
import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'

import { AtButton } from 'taro-ui'
import './index.scss'

function SingerList(props) {
    const { list, oldVal, title } = { ...props }
    const { handleClick } = { ...props }
    return <View className='list-contanier'>
          <ScrollView className='singer-list' enableFlex={true} scrollY={true} >
       
       
       {
              list && list.map((item) => {
                   return (
                       <View onClick={()=>handleClick(item.id)} className='singer-item'>
                           <View className='pic-wrapper'><Image className='pic' src={item.picUrl as string}/></View>
                           <Text className='singer-title'>{item.name}</Text>
                       </View>
                   )
               })
           }
  
      
   </ScrollView>
    </View>
  
}

export default SingerList