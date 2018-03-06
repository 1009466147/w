import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Header from '../../components/Header/index.jsx'
import UserInfo from '../../components/UserInfo/index.jsx'
import OrderList from './subpage/OrderList.jsx'
class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title='用户中心' backRouter='/'/>
                <UserInfo username={this.props.userinfo.username} city={this.props.userinfo.cityName}/>
                <OrderList username={this.props.userinfo.username}/>
            </div>
        )
    }
    componentDidMount(){
        if(!this.props.userinfo.username){
            hashHistory.push('/Login')
            return;
        }
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default User
function mapStateToProps(state){
    return {
        userinfo:state.userinfo
    }
}
function mapDiapatchToProps(dispath){
    return {}
}
export default connect(
    mapStateToProps,
    mapDiapatchToProps
)(User)