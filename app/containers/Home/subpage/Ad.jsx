import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getAdData } from '../../../fetch/home/home.js'
import HomeAd from '../../../components/HomeAd/index'
class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[]
        }
    }
    render() {
        return (
            <div>
            {
                this.state.data.length
                ? <HomeAd data={this.state.data}/>
                : <div>{/* 加载中... */}</div>
            }
            </div>
        )
    }
    componentDidMount(){
        const result=getAdData()
        result.then((res)=>{

            return res.json()

        }).then((json)=>{
            const data=json
            if(data.length){
                this.setState({
                    data:data
                })
            }

        }).catch(ex => {
            const data=[
                        {
                            title: '暑假5折',
                            img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191639092-2000037796.png',
                        },
                        {
                            title: '特价出国',
                            img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191648124-298129318.png',
                        },
                        {
                            title: '亮亮车',
                            img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191653983-1962772127.png',
                        },
                        {
                            title: '学钢琴',
                            img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191700420-1584459466.png',
                        },
                        {
                            title: '电影',
                            img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191706733-367929553.png',
                        },
                        {
                            title: '旅游热线',
                            img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016191713186-495002222.png',
                        }
                    ]
            this.setState({
                data:data
            })
            // 发生错误
            if (__DEV__) {
                console.error('首页广告模块获取数据报错, ', ex.message)
            }
        })
               
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default NotFound
export default  Ad