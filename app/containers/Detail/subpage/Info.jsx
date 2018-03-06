import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DetailInfo from '../../../components/DetailInfo/index.jsx'
import { getInfoData } from '../../../fetch/detail/detai.js'
class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            info:false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.info?
                    <DetailInfo data={this.state.info}/>:
                    ''
                }
            </div>
        )
    }
    componentDidMount(){
        var id=this.props.id;
        var result=getInfoData(id);
        result.then(res=>{
            return res.json()
        }).then(json=>{
            this.setState({
                info:json
            })
        }).catch(ex=>{
            this.setState({
                info:{
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201645858-1342445625.png',
                    title: '天下第一锅',
                    star: 4,
                    price: '88',
                    subTitle: '重庆 & 四川 麻辣火锅',
                    desc: '营业时间 11:00 - 21:00 <br> 电话订购 11:00 - 19:00 <br> 网络订购 11:00 - 19:00'
                }
            })
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default NotFound
export default  Info