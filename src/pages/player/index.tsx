
import Taro, {
  Component, Config,
  useLayoutEffect
  useEffect, useState, useRef, useMemo
} from '@tarojs/taro'
import { View, Button, Text, MovableArea, MovableView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import { AtButton, AtProgress } from "taro-ui"

import Audio from '../../api/audio'

import './index.scss'

import * as playerActionTypes from '../../actions/player'
import * as playlistActionTypes from '../../actions/playlist'

function mapStateToProps(state) {
  return {
    song: state.playerReducer.song,
    playlist: state.playlistReducer.playlist,
    songInfo: state.playerReducer.songInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSong(id) {
      dispatch(playerActionTypes.getSong(id))
    },
    getLyric(id) {
      dispatch(playerActionTypes.getLyric(id))
    },
    getSongInfo(id) {
      dispatch(playerActionTypes.getSongInfo(id))
    }
  }
}




function Player(props) {

  const { song, playlist, songInfo } = { ...props }
  const { getSong, getLyric, getSongInfo } = { ...props }

  //在上级页面取得音频和info
  // const songInfo = isEmptyObject(playlist) ? null : playlist.tracks.find(item => item.id == song.id)

  const [playState, setPlayState] = useState('paused')
  const [percent, setPercent] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)
  const progressRef = useRef()
  const audio = useMemo(() => {
    return Audio({
      url: song.url,
      playcb: () => { console.log(song.url) }

    })
  }, [song])
  const progressWidth = useMemo(() =>{
    const res = Taro.getSystemInfoSync()
 
    console.log(res.screenWidth)
    return  res.screenWidth * 0.8

  },[song])

  useEffect(() => {
    song.id && getLyric(song.id)

    
      audio.onTimeUpdate(() => {

        let newPercent = Math.floor(audio.currentTime / Number(audio.duration) * 100)
     
        setPercent(newPercent)
        setLeftOffset(progressWidth*newPercent/100)
      })
 


    console.log(songInfo);
    console.log(audio);

    return () => {
      console.log('destroy');
      audio && audio.destroy()
    }
  }, [song])
  useLayoutEffect(() => {
    console.log(progressRef.current);
   
  }, [])

  const handlePaused = () => {
    if (playState == 'paused') {
      console.log(audio.currentTime)
      setTimeout(() => {
        audio.play()
      }, 1000)
      setPlayState('play')
    } else if (playState == 'play') {
      audio.pause()
      setPlayState('paused')
    }
  }

  const handleMove = (e) => {
    console.log(e)
    //进度条
    //setPercent()
    //音频进度

    //audio.seek(Number(audio.duration)*(Number(e.detail.x)/progressWidth))

 
    

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

            <MovableArea

              className='progress-wrapper'>
              <MovableView
                onChange={handleMove}
                x={leftOffset}
                className='move-circle'

                direction='horizontal'>

              </MovableView>
              <AtProgress

                className='progress'
                color="#FF4949"
                percent={percent}
                isHidePercent={true}
                strokeWidth={4} />
              <View className='hidden-progress' ref={progressRef}></View>

            </MovableArea>

          </View>
          <View className='btn-area'>
            <Text className='iconfont prev'>&#xe655;</Text>
            {playState == 'paused' ? <Text className='iconfont play' onClick={handlePaused}>&#xe80f;</Text> :
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
