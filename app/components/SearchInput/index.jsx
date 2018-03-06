import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'
import './style.less'
class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            key:''
        }
    }
    render() {
        return (
            <input className="search-input"type="text" placeholder="请输入关键字" 
                        value={this.state.key} 
                        onChange={this.ChangeSearch.bind(this)}
                        onKeyUp={this.KeyUpHandle.bind(this)}
                        style={{color:'#666'}}/>
        )
    }
    componentDidMount(){
        console.log('key'+this.props.value)
        this.setState({
            key:this.props.value||''
        })
    }
    ChangeSearch(e){
        this.setState({
            key:e.target.value
        })
    }
    KeyUpHandle(e){
        if(e.keyCode!=13){
            return
        }
        this.props.enterHandle(this.state.key)
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default NotFound
export default  SearchInput