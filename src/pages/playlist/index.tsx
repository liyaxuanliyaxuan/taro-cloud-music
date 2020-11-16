
import Taro, { Component, Config, useEffect, useState, useLayoutEffect } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import { AtButton, AtGrid  } from "taro-ui"

import './index.scss'


import * as playListActionTypes from '../../actions/playlist'
import * as playerActionTypes from '../../actions/player'

function mapStateToProps(state){
  return {
    playlist: state.playlistReducer.playlist,
    song: state.playerReducer.song
  }
}

function mapDispatchToProps(dispatch){
  return {
    getSong(id){
      dispatch(playerActionTypes.getSong(id))
    }
  }
}




function PlayList (props) {
  
  const {playlist, song} = {...props}
  const {getSong} = {...props}



useEffect(()=>{
  console.log(playlist);
},[])

const enterSong = (id)=>{
  getSong(id)
  Taro.navigateTo({
    url:'/pages/player/index'
  })
}

 


    return (
      <View className='container'>
        <View className='banner'>
          <Image className='banner-bg' src={playlist.coverImgUrl}/>
          
          <View className='info-area'>
          <View className='cover-wrapper'>
            <Image src={playlist.coverImgUrl} className='cover-img'/>
          </View>
          <View className='txt-info'>
          <Text className='info-name'>{playlist.name}</Text>
            <Text className='info-detail'>{playlist.description}</Text>
          
          </View>
            </View>
        </View>
        {/* <View className='playlist-btn'></View> */}
        <View className='list-area'>
        {
         playlist && playlist.tracks && playlist.tracks.map(item=>{
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

PlayList.config = {

    navigationBarTitleText: '歌单详情',
    navigationBarTextStyle: 'white',
  
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayList)
