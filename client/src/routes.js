import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { Authpage } from './pages/Authpage'
import { Mypage } from './pages/Mypage'

export const useRoutes = isAutificated => {
    if (isAutificated){
        return (
            <Switch>
                <Route path="/mypage" exact>
                    <Mypage />
                </Route>
                <Redirect to="/mypage" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Authpage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )


}