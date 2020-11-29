
import Taro, {
  Component,
  Config,
  useEffect,
  useState,
  useRef,
  useLayoutEffect
} from '@tarojs/taro'
import { View, Text, Canvas, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { setBackgroundColor } from '../../utils';
import { canvasStyle } from '../../api/styleObject'



import './index.scss'


import * as playListActionTypes from '../../actions/playlist'
import * as playerActionTypes from '../../actions/player'

function mapStateToProps(state) {
  return {
    playlist: state.playlistReducer.playlist,
    song: state.playerReducer.song,
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




function PlayList(props) {

  const { playlist, song, curSongId, songIdList} = { ...props }
  const { getSong, getSongInfo, changeSongIdList, changeCurSongId } = { ...props }

  const [curId, setCurId] = useState()
  const [color, setColor] = useState('')
  



  useEffect(() => {
    console.log(playlist);
    playlist.tracks && changeSongIdList(playlist.tracks.map((item, index)=> item.id))
    
  }, [playlist])

  const enterPlayer = (id) => {
    changeCurSongId(id)

    getSong(id)
    getSongInfo(id)

    Taro.navigateTo({
      url: '/pages/player/index'
    })

  }
  useEffect(() => {

    setBackgroundColor(
      'cover-canvas', 
    playlist.coverImgUrl, 
    (color)=>setColor(color))
  
  })

  return (
    <View className='container'>
      <View className='banner'>
        <Canvas canvasId='cover-canvas' style={canvasStyle}></Canvas>
        <View className='banner-bg' style={{ backgroundColor: color }}></View>
        <View className='info-area'>
          <View className='cover-wrapper'>
            <Image src={playlist.coverImgUrl as string} className='cover-img' />
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
          playlist && playlist.tracks && playlist.tracks.map(item => {
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

PlayList.config = {

  navigationBarTitleText: '歌单详情',
  navigationBarTextStyle: 'white',

}


export default connect(mapStateToProps, mapDispatchToProps)(PlayList)
