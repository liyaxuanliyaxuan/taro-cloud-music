import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './pages/static/font/iconfont.css'
import './app.scss'

//import 'taro-ui/dist/style/index.scss' 

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/singers/index',
      'pages/album/index',
      'pages/player/index',
      'pages/playlist/index',
      'pages/introduce/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#e60000',
      navigationBarTitleText: 'cloudMusic',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color:'#ff8080',
      selectedColor:'#ff3333',
      list: [
         {
        pagePath: "pages/index/index",
        text: "推荐",
        iconPath:'pages/static/icon-music-note.png',
        selectedIconPath:'pages/static/icon-music-note.png'
      }, {
        pagePath: "pages/singers/index",
        text: "歌手专辑",
        iconPath:'pages/static/disc.png',
        selectedIconPath:'pages/static/disc.png'

      },{
        pagePath: "pages/album/index",
        text: "排行榜",
        iconPath:'pages/static/排行榜.png',
        selectedIconPath:'pages/static/排行榜.png'

      }]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
