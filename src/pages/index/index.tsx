
import Taro, { Component, Config, useEffect, useDidShow, useState, useRouter } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect, useDispatch } from '@tarojs/redux'

import {isEmptyObject} from '../../utils'
import { AtButton, AtGrid } from "taro-ui"

import './index.scss'

import MiniPlayer  from '../../components/miniplayer'
import * as recommendActionTypes from '../../actions/recommend'
import * as playlistActionTypes from '../../actions/playlist'


function mapStateToProps(state) {
  return {
    bannerList: state.recommendReducer.bannerList,
    recommendList: state.recommendReducer.recommendList,
    audio: state.playerReducer.audio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBannerList() {
      dispatch(recommendActionTypes.getBannerList())
    },
    getRecommendList() {
      dispatch(recommendActionTypes.getRecommendList())
    },
    getPlaylist(id) {
      dispatch(playlistActionTypes.getPlaylist(id))
    }
  }
}




function Index(props) {

  const { bannerList, recommendList, audio} = { ...props }
  const { getPlaylist ,getBannerList, getRecommendList } = { ...props }

  const [showPlayer, setShowPlayer] = useState()

  useEffect(() => {
  
    getBannerList()
    getRecommendList()
  }, [])

  const enterDetail = (id) => {
    getPlaylist(id)
    Taro.navigateTo({
      url: `/pages/playlist/index`,

    })
  }
  useDidShow(() => {
    console.log(Taro.$audio);
    if(Taro.$audio){
      setShowPlayer(true)
    }else{
      setShowPlayer(false)
    }
  })


  return (
    <View className='index'>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay={true}
      >
        {bannerList.length && bannerList.map(item => {
          return (<SwiperItem className='swiper-item' key={item.targetId}>
            <Image className={'banner-img'} src={item.imageUrl as string} ></Image>
          </SwiperItem>)
        })}
      </Swiper>
      <View className='recommend-title'>
        <View className='iconfont txt'>&#xe619;<Text className='txt'>推荐歌单</Text></View>
      </View>
      <View className='play-grid'>
        {
          recommendList && recommendList.map(item => {
            return (<View
              onClick={() => enterDetail(item.id)}
              key={item.id}
              className='grid-item'>
              <View className='cover-wrapper'>
                <Image className='cover-img' src={item.picUrl as string} />
              </View>
              <Text className='item-name'>{item.name}</Text>
            </View>)
          })
        }
      </View>
      {
        showPlayer?<MiniPlayer handelCancel={()=>setShowPlayer(false)}/>:null
      }
      
    </View>
  )

}

Index.config = {

  navigationBarTitleText: '首页推荐',
  navigationBarTextStyle: 'white',

}


export default connect(mapStateToProps, mapDispatchToProps)(Index)
