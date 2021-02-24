import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import AuthProvider from './state/auth/Provider'

import Login from './pages/auth/login'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>

                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>

                    <Route path="*">
                        <h1>Erro 404</h1>
                    </Route>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default App
