
import Taro, {
  Component, Config,
  useLayoutEffect,
  useEffect, useState, useRef, useMemo, useDidShow, useRouter
} from '@tarojs/taro'
import { View, Button, Text, MovableArea, MovableView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import LyricList from '../../components/liricList'
import { AtButton, AtProgress } from "taro-ui"

import Audio from '../../api/audio'
import { initLines } from '../../utils/lyricParse'
import { debounce } from '../../utils'

import './index.scss'

import * as playerActionTypes from '../../actions/player'
import * as playlistActionTypes from '../../actions/playlist'

function mapStateToProps(state) {
  return {
    song: state.playerReducer.song,
    playlist: state.playlistReducer.playlist,
    songInfo: state.playerReducer.songInfo,
    lyric: state.playerReducer.lyric,
    curSongId: state.playerReducer.curSongId,
    songIdList: state.playerReducer.songIdList
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
    },
    changeSongIdList(list) {
      dispatch(playerActionTypes.changeSongIdList(list))
    },
    changeCurSongId(id) {
      dispatch(playerActionTypes.changeCurSongId(id))
    }
  }
}

//停止和切歌才会进行destroy


function Player(props) {

  const { song, playlist, songInfo, lyric, curSongId, songIdList } = { ...props }
  const { getSong, getLyric, getSongInfo, changeAudio, changeSongIdList, changeCurSongId } = { ...props }

  //在上级页面取得音频和info
  //getSong && getSongInfo

  //为了完成全局的音乐播放组件，尝试将音乐的audio实体挂载到Taro上
  //尝试将音乐的audio对象挂载全局的状态中

  const [playState, setPlayState] = useState('paused')
  const [percent, setPercent] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)
  const [showLyric, setShowLyric] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [swiperTimer, setSwiperTimer] = useState(null)
  const progressRef = useRef()

  const audio = useMemo(() => {
    if (Taro.$audio) {
      Taro.$audio.destroy()
    }

    if (song.url) {
      const src = Audio({
        url: song.url,
        playcb: () => { console.log(song.url) }
      })
      changeAudio(src)
      Taro.$audio = src
      return src
    }
    
  }, [song])

  //进入页面之后 song作为一个prop会进行重渲染
  //song这个对象全部发生改变
  //进入页面自动播放

  const progressWidth = useMemo(() => {
    const res = Taro.getSystemInfoSync()
    return res.screenWidth * 0.8

  }, [song])
  const lyricAreaHeight = useMemo(() => {
    const res = Taro.getSystemInfoSync()
    return res.screenHeight * 0.6

  }, [song])
  
  useEffect(() => {
    song.id && getLyric(song.id)

    audio && audio.onTimeUpdate(() => {
      console.log('playing')
      let newPercent = Math.floor(audio.currentTime / Number(audio.duration) * 100)
      setPercent(newPercent)
      setScrollTop(lyricAreaHeight * newPercent / 100)
      setLeftOffset(progressWidth * newPercent / 100)
    })

    // return () => {
    //   console.log('destroy');
    //   audio && audio.destroy()
    // }
  }, [song])
  //const ifFromMini  = useRouter().params
  //巧妙使用useEffect异步从store里面取得最新的lyric
  // useEffect(() => {
  //   console.log(lyric);

  //   console.log(initLines(lyric))
  // }, [lyric])
  const lyricList = useMemo(() => {
    return initLines(lyric)
  }, [lyric])

  useDidShow(() => {
 
  })

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
 
    //进度条

    //音频进度
    //防抖
    audio
      .seek(Number(audio.duration) * (Number(e.touches[0].clientX) / progressWidth))

  }
  const handleClickProgress = (e) => {
    
    const promise = (PlayFun) =>
      new Promise((resolve, reject) => {
        PlayFun()
        setTimeout(() => {
          resolve()
        }, 2000)
      }
      )
    //第一次点击进度条play
    //进度条的长度和点击点的位置不准确
    if (playState == 'paused') {
      console.log(audio.currentTime)
      // setTimeout(()=>{
      //   audio.play()
      // },1000)
      //audio.play()
      promise(() => {

        audio.play()

      })
        .then(() => {
          audio.seek(Number(audio.duration) * (Number(e.currentTarget.x) / progressWidth))
          setLeftOffset((Number(e.currentTarget.x) / progressWidth) * 100)
        })



      setPlayState('play')
    } else {
      audio.seek(Number(audio.duration) * (Number(e.currentTarget.x) / progressWidth))
      setLeftOffset((Number(e.currentTarget.x) / progressWidth) * 100)

    }
    // audio.seek(Number(audio.duration) * (Number(e.currentTarget.x) / progressWidth))

    //setOffset()
    // setLeftOffset((Number(e.currentTarget.x) / progressWidth) * 100)
    //audio.play()
  }

  const handleSwitchCover = () => {
    setShowLyric(() => !showLyric)
  }

  const handelSwitchPrevSong = () => {
    let id = Math.max(songIdList.findIndex((val)=>val == curSongId)-1, 0)
    changeCurSongId(songIdList[id])
    getSong(songIdList[id])
    getSongInfo(songIdList[id])
    Taro.redirectTo({
      url:'/pages/player/index'
    })
  }

  const handelSwitchNextSong = () => {
    let id = Math.min(songIdList.findIndex((val)=>val == curSongId)+1, songIdList.length-1)
    changeCurSongId(songIdList[id])
    getSong(songIdList[id])
    getSongInfo(songIdList[id])
    Taro.redirectTo({
      url:'/pages/player/index'
    })
  }





  return (
    <View className='container'>

      <Image className='player-bg' src={songInfo.al.picUrl as string}></Image>
      <View className='song-title'>
        <Text className='song-name'>{songInfo.al.name}</Text>
        <Text className='writer-name'>{songInfo.ar[0].name}</Text>
      </View>
      <View className='center' onClick={handleSwitchCover}>
        {
          showLyric ? <LyricList list={lyricList} top={scrollTop} /> : <View className='album-wrapper'>
            <Image className='album-img' src={songInfo.al.picUrl as string} />
          </View>
        }
      </View>
      <View className='bottom'>
        <View className='player-area'>
          <View className='progress-area'>

            <MovableArea
              onClick={handleClickProgress}
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
            <Text 
            onClick={handelSwitchPrevSong}
            className='iconfont prev'>&#xe655;</Text>
            {playState == 'paused' ? <Text className='iconfont play' onClick={handlePaused}>&#xe80f;</Text> :
              <Text className='iconfont paused' onClick={handlePaused}>&#xe7d2;</Text>}

            <Text 
            onClick={handelSwitchNextSong}
            className='iconfont next'>&#xe654;</Text>
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
