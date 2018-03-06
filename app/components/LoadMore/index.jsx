import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore?
                    <span>加载中...</span>:
                    <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle() {
        // 执行传输过来的
        this.props.LoadMoreFn()
    }
    componentDidMount() {
        // 使用滚动时自动加载更多
        const LoadMoreFn=this.props.LoadMoreFn
        //拿到Dom
        const wrapper=this.refs.wrapper;
        let timeoutId
        function callback(){
            //getBoundingClientRect.top  获取元素距离屏幕顶部的距离
            const top=wrapper.getBoundingClientRect().top;
            //window.screen.height 获取屏幕的高度
            const windowHeight=window.screen.height
            if(top&&top<windowHeight){
                //加载更多
                LoadMoreFn()
            }
        }
        window.addEventListener('scroll',function(){
            if(this.props.isLoadingMore){
                return
            }
            //函数节流
            if(timeoutId){
                clearTimeout(timeoutId)
            }
            timeoutId=setTimeout(callback,50)
        }.bind(this),false)
    }
}

export default LoadMore