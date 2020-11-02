import React, { useState } from 'react'
import { Login } from '../component/Login'
import { Register } from '../component/Register'
import { StyleContext } from '../context/StyleContext'


export const Authpage = () => {

    const [stylesFlag, setStylesFlag] = useState(false)
    
    

    return (
        <div className ="row">
            <StyleContext.Provider value = {{stylesFlag, setFlag:setStylesFlag}}>
                <Register />
                <Login />    
            </StyleContext.Provider>  
        </div>
    )
}