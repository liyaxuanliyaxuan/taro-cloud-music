import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './index.scss'

function Loading(props) {
   return <View class="spinner">
  <View class="double-bounce1"></View>
  <View class="double-bounce2"></View>
</View>
   
}

export default Loading