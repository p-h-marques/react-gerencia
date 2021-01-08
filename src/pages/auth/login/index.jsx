import React from 'react'
import {LoginStyles} from './styles'

import './reset.css'

import Header from './header/index'
import Main from './main/index'
import Footer from './footer/index'
import Aside from './aside/index'

const Login = () => {
    return (
        <LoginStyles>
            <div className="container">
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
                <Aside></Aside>
            </div>
        </LoginStyles>
    )
}

export default Login