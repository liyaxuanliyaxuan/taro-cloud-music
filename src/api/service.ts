/*
 * @Date: 2020-11-14 21:25:53
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-16 20:53:31
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

export const getSongRequest = id => Request({
  url:`/song/url?id=${id}`,
  method: 'GET'
})

export const getLyricRequest = id => Request({
  url:`/lyric?id=${id}`,
  method: 'GET'
})

export const getSingerSongRequest = id => Request({
  url:`/artists?id=${id}`,
  method: 'GET'
})


