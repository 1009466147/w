import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'

import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
           data:[],//数据
           hasMore:false,//是否有更多
           isLoadingMore:false,//是否在加载中
           page:0//页码
        }
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length?
                    <ListCompoent data={this.state.data}/>:
                    <div>加载中</div>
                }
                {
                    this.state.hasMore?
                    <LoadMore isLoadingMore={this.state.isLoadingMore} LoadMoreFn={this.loadMoreData.bind(this)}/>:
                    <div></div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 获取首页数据
        this.loadFirstPageData();
    }
    // 获取首页数据
    loadFirstPageData(){
        const cityName=this.props.cityName;
        const result=getListData(cityName,0);
        this.resultHandle(result);
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore:true
        })
        //请求
        const page=this.state.page
        if(this.state.hasMore){
            
            const result=getListData(this.props.cityName,page)
            this.resultHandle(result);
        }
        // 返回新状态
        this.setState({
            page:page+1,
            isLoadingMore:false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const hasMore=json.hasMore;
            const data=json.data;
            this.setState({
                data:this.state.data.concat(data),
                hasMore:hasMore,
            })
            
        }).catch(ex=>{
            const data=[
                {
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201638030-473660627.png',
                    title: '汉堡大大',
                    subTitle: '叫我汉堡大大，还你多彩口味',
                    price: '28',
                    distance: '120m',
                    mumber: '389',
                    id: Math.random().toString().slice(2)
                },
                {
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201645858-1342445625.png',
                    title: '北京开源饭店',
                    subTitle: '[望京]自助晚餐',
                    price: '98',
                    distance: '140m',
                    mumber: '689',
                    id: Math.random().toString().slice(2)
                },
                {
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201652952-1050532278.png',
                    title: '服装定制',
                    subTitle: '原价xx元，现价xx元，可修改一次',
                    price: '1980',
                    distance: '160',
                    mumber: '106',
                    id: Math.random().toString().slice(2)
                },
                {
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201700186-1351787273.png',
                    title: '婚纱摄影',
                    subTitle: '免费试穿，拍照留念',
                    price: '2899',
                    distance: '160',
                    mumber: '58',
                    id: Math.random().toString().slice(2)
                },
                {
                    img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161016201708124-1116595594.png',
                    title: '麻辣串串烧',
                    subTitle: '双人免费套餐等你抢购',
                    price: '0',
                    distance: '160',
                    mumber: '1426',
                    id: Math.random().toString().slice(2)
                }
            ]
            this.setState({
                data:this.state.data.concat(data),
                hasMore:true,
            })
        })
    }
}

export default List