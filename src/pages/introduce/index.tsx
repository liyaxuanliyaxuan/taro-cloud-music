import Taro, { Component, Config, useEffect, useState, useLayoutEffect } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import { AtButton } from "taro-ui"

import './index.scss'
import { getSongDetailRequest } from '../../api/service'

import * as introduceActionTypes from '../../actions/introduce'
import * as playerActionTypes from '../../actions/player'


function mapStateToProps(state) {
  return {
    artist: state.introduceReducer.artist,
    hotSongs: state.introduceReducer.hotSongs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSong(id){
      dispatch(playerActionTypes.getSong(id))
    },
    getSongInfo(id) {
      dispatch(playerActionTypes.getSongInfo(id))
    }

  }
}




function Introduce(props) {

  const { artist, hotSongs } = { ...props }
  const { getSong, getSongInfo } = {...props }



  useEffect(() => {
    getSongDetailRequest(347230).then(res=>console.log(res))
  }, [])

  const enterSong = id =>{
    getSong(id)
    getSongInfo(id)
    Taro.navigateTo({
      url:`/pages/player/index`
    })
  }




  return (
    <View className='container'>
    <View className='banner'>
      <Image className='banner-bg' src={artist.picUrl}/>
      
      <View className='info-area'>
      <View className='cover-wrapper'>
        <Image src={artist.picUrl} className='cover-img'/>
      </View>
      <View className='txt-info'>
      <Text className='info-name'>{artist.name}</Text>
        <Text className='info-detail'>{artist.briefDesc}</Text>
      
      </View>
        </View>
    </View>
    {/* <View className='artist-btn'></View> */}
    <View className='list-area'>
    {
     hotSongs.length && hotSongs.map(item=>{
       return(
         <View 
         className='song-item' 
         onClick={()=>enterSong(item.id)}>
           <Text className='item-name'>{item.name}</Text>
         </View>
       )
     })
   }
    </View>     
  </View>

  )

}

Introduce.config = {

  navigationBarTitleText: '歌手详情',
  navigationBarTextStyle: 'white',

}


export default connect(mapStateToProps, mapDispatchToProps)(Introduce)
