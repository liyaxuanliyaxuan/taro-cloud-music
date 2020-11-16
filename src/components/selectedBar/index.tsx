import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtSwipeAction, AtSwitch } from "taro-ui"


import { AtButton } from 'taro-ui'
import './index.scss'

function SelectedBar(props) {
    const { list, oldVal, title } = { ...props }
    const { handleClick } = { ...props }
    return <ScrollView className='selected-list' enableFlex={true} scrollX={true} >
        <Text className='title'>{title}</Text>
       
        {
               list && list.map((item) => {
                    return (
                        <View
                            key={item.key}
                            className={`${oldVal === item.key ? 'bar-item selected-item' : 'bar-item'}`}
                            onClick={() => handleClick(item.key)}>
                            {item.name}
                        </View>
                    )
                })
            }
   
       
    </ScrollView>
}

export default SelectedBar