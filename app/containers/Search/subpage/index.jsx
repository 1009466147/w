import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import ListItem from '../../../components/List/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'
import { getSearchData } from '../../../fetch/search/search.js'
import { connect } from 'react-redux'

const initialState={
    page:0,
    data:[],
    hasmore:false,
    isLoadingMore:false
}
class SearchList extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state=initialState;
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length?
                    <ListItem data={this.state.data}></ListItem>:
                    <div>加载中...</div>
                }
                


                {
                    this.state.hasmore?
                    <LoadMore isLoadingMore={this.state.isLoadingMore} LoadMoreFn={this.LoadMoreFn.bind(this)}/>:
                    ''
                }
            </div>
        )
    }
    componentDidMount(){
        this.firstDateRender()
    }

    componentDidUpdate(prevProps,prevState){
        const type = prevProps.type;
        const keyword = prevProps.keyword;

        if(this.props.type===type&&this.props.keyword===keyword){
            return
        }

        this.setState(initialState)
        this.firstDateRender()
    }
    firstDateRender(){
        const cityName=this.props.userinfo.cityName;
        const type=this.props.type;
        const keyword=this.props.keyword;
        const result=getSearchData(0,cityName,type,keyword);
        this.getDataMsg(result)
    }

    getDataMsg(result){
        this.setState({
            isLoadingMore:true
        })
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const data=this.state.data;
            const page=this.state.page;
            this.setState({
                page:page+1,
                data:data.concat(json.data),
                hasmore:json.hasMore,
                isLoadingMore:false
            })
        }).catch(ex=>{
            const json={
                hasMore: true,
                data: [
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022145742279-606202974.jpg',
                        title: '河束人家',
                        subTitle: '南锣鼓巷店',
                        price: '150',
                        distance: '120m',
                        mumber: '389',
                        id: Math.random().toString().slice(2)
                    },
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022145750123-1745839503.jpg',
                        title: '漫漫火锅',
                        subTitle: '[王府井]自助火锅',
                        price: '113',
                        distance: '140m',
                        mumber: '689',
                        id: Math.random().toString().slice(2)
                    },
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022145755545-1770557408.jpg',
                        title: '北方涮肉',
                        subTitle: '什刹海店',
                        price: '92',
                        distance: '160',
                        mumber: '106',
                        id: Math.random().toString().slice(2)
                    },
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022145800732-576947550.jpg',
                        title: '姓高火锅',
                        subTitle: '知春里店',
                        price: '90',
                        distance: '160',
                        mumber: '58',
                        id: Math.random().toString().slice(2)
                    },
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022145806201-1193851669.jpg',
                        title: '八重牛府',
                        subTitle: '最好吃的牛丸',
                        price: '85',
                        distance: '160',
                        mumber: '1426',
                        id: Math.random().toString().slice(2)
                    },
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022150855185-1659375763.jpg',
                        title: '蜀乡涮锅',
                        subTitle: '[王府井]自助火锅',
                        price: '113',
                        distance: '140m',
                        mumber: '689',
                        id: Math.random().toString().slice(2)
                    },
                    {
                        img: 'http://images2015.cnblogs.com/blog/138012/201610/138012-20161022145800732-576947550.jpg',
                        title: '满楼福火锅',
                        subTitle: '知春路店',
                        price: '90',
                        distance: '160',
                        mumber: '58',
                        id: Math.random().toString().slice(2)
                    }
                ]
            }
            const data=this.state.data;
            const page=this.state.page;
            this.setState({
                page:page+1,
                data:data.concat(json.data),
                hasmore:json.hasMore,
                isLoadingMore:false
            })
            if(_DEV_){
                console.error('搜索结果页数据获取出错:'+ex.message)
            }
        })
    }
    LoadMoreFn(){
        const page=this.state.page;
        const cityName=this.props.userinfo.cityName;
        const type=this.props.type;
        const keyword=this.props.keyword;
        const result=getSearchData(page,cityName,type,keyword);
        this.getDataMsg(result)
    }
}

function mapStateToProps(state){
    return {
        userinfo:state.userinfo
    }
}
function mapDispatchToProps(dispath){
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)