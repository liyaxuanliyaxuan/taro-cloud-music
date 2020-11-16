
import Taro, { Component, Config, useEffect, useState, useLayoutEffect, useMemo } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { isEmptyObject } from '../../utils'

import { AtButton, AtProgress } from "taro-ui"

import Audio from '../../api/audio'

import './index.scss'

import * as playerActionTypes from '../../actions/player'
import * as playlistActionTypes from '../../actions/playlist'

function mapStateToProps(state) {
  return {
    song: state.playerReducer.song,
    playlist: state.playlistReducer.playlist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSong(id) {
      dispatch(playerActionTypes.getSong(id))
    },
    getLyric(id) {
      dispatch(playerActionTypes.getLyric(id))
    }
  }
}




function Player(props) {

  const { song, playlist } = { ...props }
  const { getSong, getLyric } = { ...props }


  const songInfo = isEmptyObject(playlist) ? null : playlist.tracks.find(item => item.id == song.id)

  const [playState, setPlayState] = useState('paused')
  const [percent, setPercent] = useState(0)
  const audio = useMemo(()=>{
    return Audio({ url: song.url, playcb: () => { console.log(song.url) } })
  }, [song])

  useEffect(() => {
    song.id && getLyric(song.id)
    console.log(songInfo);
    console.log(audio.startTime);
    console.log(audio.duration)
    console.log(audio.currentTime);
    console.log(audio);

    return ()=>{
      console.log('destroy');
      audio && audio.destroy()
    }
  }, [song])

  useEffect(()=>{
    // console.log('change')
    // setPercent(Math.floor(Number(audio.currentTime)*1000/(song.dt)*100))
    
  },[audio.currentTime])

  const handlePaused = ()=>{
    if(playState == 'paused'){
      console.log(audio.currentTime);
      audio.play()
      setPlayState('play')
    }else if(playState == 'play'){
      audio.pause()
      setPlayState('paused')
    }
  }



  return (
    <View className='container'>

      <Image className='player-bg' src={songInfo.al.picUrl}></Image>
      <View className='song-title'>
        <Text className='song-name'>{songInfo.al.name}</Text>
        <Text className='writer-name'>{songInfo.ar[0].name}</Text>
      </View>
      <View className='center'>
        <View className='album-wrapper'>
          <Image className='album-img' src={songInfo.al.picUrl} />
        </View>
      </View>
      <View className='bottom'>
        <View className='player-area'>
          <View className='progress-area'>
            <AtProgress 
            className='progress'
          
            percent={percent} 
            isHidePercent={true}
            strokeWidth={4}/>
          </View>
          <View className='btn-area'>
            <Text className='iconfont prev'>&#xe655;</Text>
            {playState == 'paused'?<Text className='iconfont play' onClick={handlePaused}>&#xe80f;</Text>:
            <Text className='iconfont paused' onClick={handlePaused}>&#xe7d2;</Text>}
            
            <Text className='iconfont next'>&#xe654;</Text>
          </View>
        </View>
      </View>
    </View>
  )

}

Player.config = {

  navigationBarTitleText: '歌曲播放',
  navigationBarTextStyle: 'white',

}


export default connect(mapStateToProps, mapDispatchToProps)(Player)
