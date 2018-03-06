import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BuyAndStore from '../../../components/BuyAndStore/index.jsx'
import { hashHistory } from 'react-router'
import * as storeActionsFromFile from '../../../actions/store.js'
class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore:false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
        )
    }
    componentDidMount(){
        this.checkStoreState()
    }
    //是否收藏
    checkStoreState(){
        const id=this.props.id;
        const store=this.props.store;
        //遍历  return true 跳出循环
        store.some(item=>{
            if(item.id===id){
                this.setState({
                    isStore:true
                })
                //跳出循环
                return true
            }
        })
    }
    //购买
    buyHandle(){
        const loginFlag=this.loginCheck()
        if(!loginFlag){
            return
        }
        //购买的流程


        //跳转到用户主页
        hashHistory.push('/User')
    }
    //收藏
    storeHandle(){
        console.log(this.state.isStore)
        const loginFlag=this.loginCheck()
        if(!loginFlag){
            return
        }
        const id=this.props.id;
        const actions=this.props.storeActions;
        if(this.state.isStore){
            //当前商户已经被收藏 点击时取消收藏
            actions.rm({id:id})
        }else{
            //收藏
            actions.add({id:id})
        }
        //更新状态  
        this.setState({
            isStore:!this.state.isStore
        })
    }
    //验证登录
    loginCheck(){
        const id=this.props.id;
        const userinfo=this.props.userinfo;
        if(!userinfo.username){
            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
}
function mapStateToProps(state){
    return {
        userinfo:state.userinfo,
        store:state.store
    }
}
function mapDispatchToProps(dispath){
    return {
        storeActions:bindActionCreators(storeActionsFromFile,dispath)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)