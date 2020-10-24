import React, { useContext } from 'react'
import { AuthContext } from '../component/context'

export const Mypage = () => {
    
    const Auth = useContext(AuthContext)

    const removeAuth = () => {
        Auth.getAutificated(false)
        localStorage.clear()
    }

    return (
        <div>
            <h1>
                Mypage
            </h1>
            <button type="submit" className="btn btn-primary" onClick = {removeAuth}>Выход</button>
        </div>
    )
}
