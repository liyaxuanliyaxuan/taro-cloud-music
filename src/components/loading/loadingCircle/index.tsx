import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './index.scss'

function LoadingCircle(props) {
   return <View className="spinner">
  <View className="double-bounce1"></View>
  <View className="double-bounce2"></View>
</View>
   
}

export default LoadingCircle