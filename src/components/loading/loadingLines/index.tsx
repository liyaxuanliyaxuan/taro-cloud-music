import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './index.scss'

function LoadingLine(props) {
   return <View className="spinner">
   <View className="rect1"></View>
   <View className="rect2"></View>
   <View className="rect3"></View>
   <View className="rect4"></View>
   <View className="rect5"></View>
 </View>
   
}

export default LoadingLine