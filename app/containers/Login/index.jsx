import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo' 
import Header from '../../components/Header/index.jsx'
import LoginComponent from '../../components/Login/index.jsx'
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            checking:true
        }
    }
    render() {
        return (
            <div>
                 <Header title='登录'/>
                {
                    this.state.checking?
                    <div>{/*等待中*/}</div>:
                    <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
                }
            </div>
        )
    }
    componentDidMount(){
        this.doCheck()
    }
    //登录之后的业务处理  
    loginHandle(username){
        const actions=this.props.userInfoActions;
        let userinfo=this.props.userinfo;
        userinfo.username=username;
        actions.update(userinfo)
 
        const router = this.props.params.router;
        if(router){
            hashHistory.push(router)
        }else{
            this.goUserPage()
        }
    }
    doCheck(){
        const userinfo=this.props.userinfo;
        if(userinfo.username){
            this.goUserPage()
        }else{
            this.setState({
                checking:false
            })
        }
    }
    goUserPage(){
        hashHistory.push('/User')
    }
}
function mapStateToProps(state){
    return {userinfo:state.userinfo}
}
function mapDispatchToProps(dispath){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispath)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)