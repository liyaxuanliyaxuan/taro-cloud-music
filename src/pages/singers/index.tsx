import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import {AtButton} from 'taro-ui'
import loadingLines from '../../components/loading/loadingLines'
import './index.scss'


import * as singerActionTypes from '../../actions/singers'
import * as introduceActionTypes from '../../actions/introduce'

import { categoryTypes, alphaTypes} from '../../api/constant'
import SelectedBar from '../../components/selectedBar'
import SingerList from '../../components/singerList'
import LoadingLine from '../../components/loading/loadingLines'



function mapStateToProps(state){
  return {
    singerList: state.singerReducer.singerList,
    pageCount: state.singerReducer.pageCount,
    loading: state.singerReducer.loading
  }
}

function mapDispatchToProps(dispatch){
  return {
    getInitSingerList(category, alpha){
      dispatch(singerActionTypes.getInitSingerList(category, alpha))
    },
    getInitHotSingerList(){
      dispatch(singerActionTypes.getInitHotSingerList())
    },
    getSingerSong(id){
      dispatch(introduceActionTypes.getSingerSong(id))
    },
    changeLoading(val){
      dispatch(singerActionTypes.changeLoading(val))
    }
  }
}




function Singers(props){
  const {singerList,  pageCount, loading} = {...props}
  const {getInitHotSingerList, getSingerSong, changeLoading, getInitSingerList} ={...props}

  const [category, setCategory] = useState()
  const [alpha, setAlpha] = useState()

  const enterIntroduce = (id)=>{
    getSingerSong(id)
    Taro.navigateTo({
      url:'/pages/introduce/index'
    })
  }

  useEffect(()=>{
    
    getInitHotSingerList()   
  },[])


  useEffect(()=>{
    if(alpha && category){
      getInitSingerList(category, alpha)
    }
  },[alpha, category])


  return <View className='container'>
    <SelectedBar 

    title={'分类'}
    oldVal={category}
    list={categoryTypes}
    handleClick={val=>setCategory(val)}
    />
    <SelectedBar

    title={'首字母'}
    oldVal={alpha}
    list={alphaTypes}
    handleClick={val=>setAlpha(val)}
    />
    {loading? <LoadingLine/>:<SingerList handleClick={enterIntroduce} list={singerList}/>}
 
  </View>
}

Singers.config = {
  navigationBarTitleText: '歌手',
  navigationBarTextStyle: 'white',
}

export default connect(mapStateToProps, mapDispatchToProps)(Singers)

