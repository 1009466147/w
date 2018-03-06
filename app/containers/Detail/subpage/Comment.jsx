import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detai'

import ListComponent from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    render() {
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    : <div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore} LoadMoreFn={this.loadMoreData.bind(this)}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount() {
        this.loadFirstPageData();
    }
    // 获取首页数据
    loadFirstPageData() {
        const id = this.props.id
        const result = getCommentData(0, id)
        this.resultHandle(result)
    }
    // 加载更多数据
    loadMoreData() {
        // 记录状态
        this.setState({
            isLoadingMore: true
        })

        const id = this.props.id
        const page = this.state.page
        const result = getCommentData(page, id)
        this.resultHandle(result)

        // 增加 page 技术
        this.setState({
            isLoadingMore: false
        })
    }
    // 处理数据
    resultHandle(result) {
        result.then(res => {
            return res.json()
        }).then(json => {
            // 增加 page 技术
            const page = this.state.page
            this.setState({
                page: page + 1
            })

            const hasMore = json.hasMore
            const data = json.data

            this.setState({
                hasMore: hasMore,
                // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                data: this.state.data.concat(data)
            })
        }).catch(ex => {
            const page = this.state.page
            this.setState({
                page: page + 1
            })
            const data=[
                    {
                        username: '133****3355',
                        comment: '非常好吃，棒棒的，下次再来',
                        star: 5
                    },
                    {
                        username: '135****3452',
                        comment: '羊肉够分量，不错',
                        star: 4
                    },
                    {
                        username: '137****1242',
                        comment: '有自助的水果，非常喜欢',
                        star: 4
                    },
                    {
                        username: '131****3980',
                        comment: '桌子环境有点糟糕，不喜欢',
                        star: 2
                    },
                    {
                        username: '135****3565',
                        comment: '基本还可以，中规中矩吧，虽然没有啥惊喜',
                        star: 3
                    },
                    {
                        username: '130****9879',
                        comment: '感觉很棒，服务员态度非常好',
                        star: 5
                    },
                    {
                        username: '186****7570',
                        comment: '要是能多给开点发票就好了，哈哈啊',
                        star: 4
                    }
                ]
            this.setState({
                hasMore: true,
                // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                data: this.state.data.concat(data)
            })
            if (__DEV__) {
                console.error('详情页获取用户评论数据出错, ', ex.message)
            }
        })
    }
}

export default Comment