
import Taro, { Component, Config, useEffect, useState, useLayoutEffect } from '@tarojs/taro'
import {
  View,
  Canvas,
  Button,
  Text,
  Image
} from '@tarojs/components'
import { connect } from '@tarojs/redux'


import { AtButton } from "taro-ui"

import './index.scss'
import { setBackgroundColor } from '../../utils';
import { canvasStyle } from '../../api/styleObject'

import { getSongDetailRequest } from '../../api/service'

import * as introduceActionTypes from '../../actions/introduce'
import * as playerActionTypes from '../../actions/player'


function mapStateToProps(state) {
  return {
    artist: state.introduceReducer.artist,
    hotSongs: state.introduceReducer.hotSongs,
    curSongId: state.playerReducer.curSongId,
    songIdList: state.playerReducer.songIdList
  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSong(id) {
      dispatch(playerActionTypes.getSong(id))
    },
    getSongInfo(id) {
      dispatch(playerActionTypes.getSongInfo(id))
    },
    changeSongIdList(list) {
      dispatch(playerActionTypes.changeSongIdList(list))
    },
    changeCurSongId(id) {
      dispatch(playerActionTypes.changeCurSongId(id))
    }


  }
}




function Introduce(props) {

  const { artist, hotSongs, curSongId, songIdList } = { ...props }
  const { getSong, getSongInfo, changeSongIdList, changeCurSongId } = { ...props }
  const [color, setColor] = useState('')



  useEffect(() => {
    //test getSongDetail

    hotSongs.length && changeSongIdList(hotSongs.map((item, key)=>item.id))
  }, [hotSongs])

  const enterPlayer = id => {
    changeCurSongId(id)
    getSong(id)
    getSongInfo(id)
    Taro.navigateTo({
      url: `/pages/player/index`
    })
  }
  useEffect(() => {

    artist.picUrl && setBackgroundColor(
      'singer-canvas',
      artist.picUrl,
      (color) => setColor(color))

  })




  return (
    <View className='container'>
      <View className='banner'>
        <Canvas canvasId='singer-canvas' style={canvasStyle}></Canvas>
        <View className='banner-bg' style={{ backgroundColor: color }}></View>
        <View className='info-area'>
          <View className='cover-wrapper'>
            <Image src={artist.picUrl as string} className='cover-img' />
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
          hotSongs.length && hotSongs.map(item => {
            return (
              <View
                className='song-item'
                onClick={() => enterPlayer(item.id)}>
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
