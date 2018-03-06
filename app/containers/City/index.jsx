import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { createStore,combineReducers,bindActionCreators } from 'redux'
import * as actionTypes from '../../constants/userinfo.js'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Header from '../../components/Header/index.jsx'
import CurrentCity from '../../components/CurrentCity/index.jsx'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

import CityList from '../../components/CityList/index.jsx'

import LocalStore from '../../util/localStore.js'
import { CITYNAME } from '../../config/localStoreKey.js'
class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title="选择城市"/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeCity={this.changeCity.bind(this)}/>
            </div>
        )
    }
    changeCity(newCity){
        if(newCity==null){
            return
        }
        //修改redux
        const userinfo=this.props.userinfo
        userinfo.cityName=newCity
        this.props.userInfoActions.update(userinfo)

        //修改localStorage
        LocalStore.setItem(CITYNAME,newCity)

        //跳转
        hashHistory.push('/')
    }
    componentDidMount(){
        // //创建reducer
        // const rootReducers=()=>{
        //     const initialState={}
        //     const counter=(state=initialState,action)=>{
        //         switch (action.type){
        //             case actionTypes.USERINFO_LOGIN:
        //                 return action.data
        //             case actionTypes.USERINFO_CITYNAME:
        //                 return action.data
        //             default:
        //                 return state
        //         }
        //     }
        //     //合并reducer
        //     const rootReducer=combineReducers({
        //         counter,

        //     })
        //     return rootReducer
        // }
        // //创建store
        // const configureStore=(initialState)=>{
        //         const rootReducerss=rootReducers();
        //         const store=createStore(rootReducerss,initialState,
        //             window.devToolsExtension?window.devToolsExtension():undefined
        //         )
        //         return store
        // }
        // const store=configureStore()

        // // 监听
        // store.subscribe(()=>{
        //     console.log(store.getState())
        // })
        // store.subscribe(()=>{
        //     console.log(store.getState())
        // })

        // // 修改
        // store.dispatch({type:'USERINFO_CITYNAME',data:'南京'})

    }

}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default City
// ----react rudex绑定---
function mapStateToProps(state){
    return{
        userinfo:state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        userInfoActions:bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)
