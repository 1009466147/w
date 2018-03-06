import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import { getOrderListData,postComment } from '../../../fetch/user/orderlist.js'
import OrderListComponent from '../../../components/OrderList/index.jsx'
class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[]
        }
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    this.state.data.length?
                    <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>:
                    ''
                }
            </div>
        )
    }
    componentDidMount(){
        const username=this.props.username
        if(username){
            this.loadOrderList(username)
        }
    }
    loadOrderList(username){
        const result=getOrderListData(username)
        console.log(result)
        result.then(res=>{
            return res.json()
        }).then(json=>{
            // 获取数据
            this.setState({
                data: json
            })
        }).catch(ex => {
            const json=[
                {
                    id: Date.now(),
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201638030-473660627.png',
                    title: '汉堡大',
                    count: 3,
                    price: '167',
                    commentState: 0
                },
                {
                    id: Date.now(),
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201708124-1116595594.png',
                    title: '麻辣香锅',
                    count: 1,
                    price: '188',
                    commentState: 0
                },
                {
                    id: Date.now(),
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201645858-1342445625.png',
                    title: '好吃自出餐',
                    count: 2,
                    price: '110',
                    commentState: 2
                }
            ]
            this.setState({
                data: json
            })
            if (__DEV__) {
                
                console.error('用户主页“订单列表”获取数据报错, ', ex.message)
            }
        })
    }
    //提交评价
    submitComment(id,value,callback){
        const result=postComment(id,value);
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if(json.errno===0){
                //评价成功
                callback()
            }
        })
    }
}

export default  OrderList