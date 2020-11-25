import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login, ANNOTATIONTOOL, HOMEPAGE, EDITOR } from './routes'
import Annotator from "./Annotator"
import DemoSite from "./DemoSite"
import MainLogin from './login'
import Editor from './DemoSite/Editor'
class AllRouters extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={Login} component={MainLogin} />
                    <Route path={HOMEPAGE} component={DemoSite} />
                    <Route path={ANNOTATIONTOOL} component={Annotator} />
                    <Route path={EDITOR} component={Editor} />
                </Switch>
               
            </div>
        )
    }
}

export default AllRouters
