import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState, useDidShow } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './index.scss'
import Loading from '../../components/loading'

import { OfficialList} from '../../components/officialList'
import { GlobalList } from '../../components/globalList'



import { filterIdx, filterIndex } from '../../utils'


import * as rankActionTypes from '../../actions/rank'
import * as playlistActionTypes from '../../actions/playlist'



function mapStateToProps(state) {
  return {
    rankList: state.rankReducer.rankList,
    loading: state.rankReducer.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRankList() {
      dispatch(rankActionTypes.getRankList())
    },
    getPlaylist(id) {
      dispatch(playlistActionTypes.getPlaylist(id))
    },
    changeLoading() {
      dispatch(rankActionTypes.changeLoading(true))
    }
  }
}




function Album(props) {
  const { rankList, loading } = { ...props }
  const { getRankList, getPlaylist, changeLoading } = { ...props }

  const [officialList, setOfficialList] = useState()
  const [globalList, setGolbalList] = useState()
  const [showPlayer, setShowPlayer] = useState()

  useEffect(() => {
    changeLoading(true)
    getRankList()
    let globalStartIndex = filterIndex(rankList);
    setOfficialList(rankList.slice(0, globalStartIndex))
    setGolbalList(rankList.slice(globalStartIndex))
  }, [rankList.length])

  useDidShow(()=>{

  })

  const enterDetail = (id)=>{
    console.log(id);
    getPlaylist(id)
    Taro.navigateTo({
      url: `/pages/playlist/index`
    })
  }


  return (
    <View className='container'>
    <View className='official-rank'>
      <Text className='rank-title'>官方榜</Text>
      {
        loading?<Loading/>:<OfficialList list={officialList} handleClick={enterDetail}/>
      }
      
    </View>
    <View className='global-rank'>
      <Text className='rank-title'>全球榜</Text>
      {
        loading?<Loading/>:<GlobalList list={globalList} handleClick={enterDetail}/>
      }
    </View>
  </View>
  )
}

Album.config = {
  navigationBarTitleText: '专辑',
  navigationBarTextStyle: 'white',
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)

