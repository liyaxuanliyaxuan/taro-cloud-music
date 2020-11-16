/*
 * @Date: 2020-11-15 19:04:25
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 09:54:33
 */
import {RankTypes} from '../api/constant'
 
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