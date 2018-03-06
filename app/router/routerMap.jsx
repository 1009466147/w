import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from '../containers/index'
import Home from '../containers/Home/index'
import City from '../containers/City/index'
import User from '../containers/User/index'
import Search from '../containers/Search/index'
import Detail from '../containers/Detail/index'
import NotFound from '../containers/404'
import Login from '../containers/Login/index.jsx'

// 如果是大型项目，router部分就需要做更加复杂的配置
// 参见 https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component{
    render (){
        return (
            <Router history={this.props.history}>
                <Route path='/'component={App}>
                    <IndexRoute component={Home}></IndexRoute>
                    <Route path='/city'component={City}></Route>
                    <Route path='/User'component={User}/>
                    <Route path='/search/:type(/:keyword)'component={Search}/>
                    <Route path='/detail/:id'component={Detail}/>
                    <Route path='/Login(/:router)'component={Login}></Route>
                    <Route path='*'component={NotFound}/>
                </Route>
            </Router> 
        )
    }
}

export default RouterMap;
