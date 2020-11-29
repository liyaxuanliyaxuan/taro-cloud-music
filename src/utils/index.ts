/*
 * @Date: 2020-11-15 19:04:25
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-29 17:08:20
 */
import {RankTypes} from '../api/constant'
import Taro, { Component, Config, useEffect, useState } from '@tarojs/taro'
 
//处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
      if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
        return i + 1;
      }
    }
  };
  
  //找出排行榜的编号
  export const filterIdx = name => {
    for (var key in RankTypes) {
      if (RankTypes[key] === name) return key;
    }
    return null;
  };

  export const isEmptyObject = obj => !obj || Object.keys (obj).length === 0;

  //防抖
  export function debounce(fn, delay){
    let timer = null
    return function(){
      let ctx = this
      let args = arguments
      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(()=>{
        fn.call(ctx, args)
      }, delay)
    }
  }

 //设置背景颜色
 export function setBackgroundColor(canvasId ,imgUrl, callback){
  const ctx = Taro.createCanvasContext(canvasId)
  Taro.downloadFile({
    url: imgUrl.replace('http://', 'https://'),
    //'https://pic.veraliyaxuan.cn'
    success: (res) => {
    
      ctx.drawImage(res.tempFilePath, 0, 0, 20, 20)
      ctx.draw(false, () => {
        Taro.canvasGetImageData({
          canvasId,
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          success: (res) => {
          
            var colorPoint = res.data.slice(res.data.length - 4)
            var color = 'rgba(' + colorPoint.join(',') + ')'
            callback(color)
          }
        })
      })

    }

  })



 }