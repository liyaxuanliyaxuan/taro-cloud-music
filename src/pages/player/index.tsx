
import Taro, {
  Component, Config,
  useLayoutEffect,
  useEffect, useState, useRef, useMemo, useDidShow, useRouter
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
    songInfo: state.playerReducer.songInfo,
   
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
    },
    changeAudio(data) {
      dispatch(playerActionTypes.changeAudio(data))
    }
  }
}

//停止和切歌才会进行destroy


function Player(props) {

  const { song, playlist, songInfo } = { ...props }
  const { getSong, getLyric, getSongInfo, changeAudio } = { ...props }

  //在上级页面取得音频和info
  // const songInfo = isEmptyObject(playlist) ? null : playlist.tracks.find(item => item.id == song.id)

  const [playState, setPlayState] = useState('paused')
  const [percent, setPercent] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)
  const progressRef = useRef()
  const audio = useMemo(() => {
   let src = Audio({
      url: song.url,
      playcb: () => { console.log(song.url) }
    })
    Taro.$audio = src
    return src
  }, [song])

  //进入页面之后 song作为一个prop会进行重渲染
  //song这个对象全部发生改变

  const progressWidth = useMemo(() => {
    const res = Taro.getSystemInfoSync()
    return res.screenWidth * 0.8

  }, [song])

  useEffect(() => {
    song.id && getLyric(song.id)


    audio.onTimeUpdate(() => {
      console.log('1')
      let newPercent = Math.floor(audio.currentTime / Number(audio.duration) * 100)

      setPercent(newPercent)
      setLeftOffset(progressWidth * newPercent / 100)
    })

    console.log(songInfo);
   // console.log(audio);

    // return () => {
    //   console.log('destroy');
    //   audio && audio.destroy()
    // }
  }, [])
  const ifFromMini  = useRouter().params

  useDidShow(()=>{
    //页面显示
    //检测有无音频播放
    //有音频播放
    console.log(ifFromMini)
   

    //进度条在相应的位置

    //有无携带参数
    console.log(audio.currentTime)

    const currentPosition = Taro.$audio.currentTime



    //当前播放的位置
    //当前的状态
  })

  useLayoutEffect(() => {
    

  }, [])

  const handlePaused = () => {
    if (playState == 'paused') {
      console.log(audio.currentTime)
      setTimeout(() => {
        audio.play()
      }, 2000)
      setPlayState('play')
    } else if (playState == 'play') {
      audio.pause()
      setPlayState('paused')
    }
  }

  const handleMove = (e) => {
    console.log(e)
    //进度条

    //音频进度
    //防抖
    audio.seek(Number(audio.duration) * (Number(e.touches[0].clientX) / progressWidth))



  }
  const handleClick = (e) => {
    console.log(e)
    
    if (playState == 'paused') {
      console.log(audio.currentTime)
      setTimeout(() => {
        audio.play()
      }, 1000)
      setPlayState('play')
    }
    audio.seek(Number(audio.duration) * (Number(e.currentTarget.x) / progressWidth))
    audio.play()
    //audio.seek()
    //setOffset()

    setLeftOffset((Number(e.currentTarget.x) / progressWidth)*100)
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
            onClick={handleClick}
              className='progress-wrapper'>
              <MovableView
                onHTouchMove={handleMove}
                x={leftOffset}
                className='move-circle'

                direction='horizontal'>

              </MovableView>
              <View 
              className='progress-click' 
              >
                <AtProgress

                  className='progress'

                  color="#FF4949"
                  percent={percent}
                  isHidePercent={true}
                  strokeWidth={4} />
              </View>



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
