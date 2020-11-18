/*
 * @Date: 2020-11-14 21:25:53
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-17 13:18:14
 */
import Request from './request';



export const getRecommendListRequest = () =>
  Request({
      url: '/personalized',
      method:'GET',   
  })


export const getBannerRequest = () => 
Request({
    url:'/banner',
    method: 'GET'
})


export const getHotSingerListRequest = (count) => 
Request({
  url:`/top/artists?offset=${count}`,
  method: 'GET'
})
 
export const getSingerListRequest= (category, alpha, count) => 
Request({
  url:`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`,
  method: 'GET'
})

export const getRankListRequest = () => Request({
  url:`/toplist/detail`,
  method: 'GET'
});

export const getPlayListRequest = id => Request({
  url:`/playlist/detail?id=${id}`,
  method: 'GET'
})

//获得歌曲音频
export const getSongRequest = id => Request({
  url:`/song/url?id=${id}`,
  method: 'GET'
})

export const getLyricRequest = id => Request({
  url:`/lyric?id=${id}`,
  method: 'GET'
})
//获得歌手信息和热门歌单
export const getSingerSongRequest = id => Request({
  url:`/artists?id=${id}`,
  method: 'GET'
})
//获得歌曲详情
export const getSongDetailRequest = id => Request({
  url:`/song/detail?ids=${id}`,
  method:'GET'
})


