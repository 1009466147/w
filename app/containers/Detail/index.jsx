import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index.jsx'
import Info from './subpage/Info.jsx'
import Comment from './subpage/Comment.jsx'
import Buy from './subpage/Buy.jsx'
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title='商户详情'/>
                <Info id={this.props.params.id}/>
                <Buy id={this.props.params.id}/>
                <Comment id={this.props.params.id}/>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default Detail
export default  Detail