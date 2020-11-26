/*
 * @Date: 2020-11-16 10:51:01
 * @LastEditors: Vera
 * @LastEditTime: 2020-11-26 20:14:36
 */
import Taro from '@tarojs/taro'

export default function(options={url:'', playcb, pausecb, seekcb, stopcb, updatecb}){
    const innerAudioContext = Taro.createInnerAudioContext()
    innerAudioContext.autoplay = false
    innerAudioContext.src = options.url
    innerAudioContext.onPlay(() => {
        console.log('开始播放')
        options.playcb && options.playcb()
    })
    innerAudioContext.onTimeUpdate(()=>{
        console.log('播放中')
        options.updatecb && options.updatecb()
    })
    innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
    })
    innerAudioContext.onPause((res)=>{
        console.log('pause')
        options.pausecb && options.pausecb()
    })
    innerAudioContext.onSeeked(res=>{
        console.log('seeked')
        options.seekcb && options.seekcb()
    })
    innerAudioContext.onStop(res=>{
        console.log('stop')
        options.stopcb && options.stopcb()
    })
    return innerAudioContext
}