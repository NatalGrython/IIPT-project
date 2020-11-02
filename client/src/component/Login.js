import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/Authcontext'
import { StyleContext } from '../context/StyleContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/messege.hook'

export const Login = () => {
    
    const StyleApi = useContext(StyleContext)
    const {request, loading, error, clearError} = useHttp()
    const message = useMessage()
    const Auth = useContext(AuthContext)
    
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    useEffect ( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]: event.target.value,
            
        })
    }



    const updateAuth = (userId, token) => {
        Auth.getAutificated(true)
        localStorage.getItem(userId, token)
    }

    const loginHendler = async () => {
        try {
            console.log('==================== REGISTR HENDLER ===========================')
            const data = await request('/api/auth/login', 'POST', {...form})
            console.log('==================== REGISTR HENDLER END ===========================')
            console.log(data)
            updateAuth(data.userID, data.token)
        } catch (e) {
            console.log(e)
        }
    }

    const changeStyle = () => {
        StyleApi.setFlag(!StyleApi.stylesFlag)  
    }

    const definStyle = () => {
        if (!StyleApi.stylesFlag) {
            return {display:"none"}
        } else {
            return {display:"block"}
        }
    }

    const style = definStyle()

    return (
        <div className="jumbotron" id = "login" style={style}>
            <h1 className = "mx-auto">Вход</h1>
            <div className="mx-auto">
                <form>
                    <div className="form-group">
                        <label htmlFor="emailIn">Email</label>
                        <input type="email"  className="form-control" id="emailIn" aria-describedby="emailHelp" placeholder="Email" name="email"  onChange={changeHandler}/>
                        <small id="emailHelp" className="form-text text-muted">Не дадим ваш пароль никому</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordIn">Пароль</label>
                        <input type="password" className="form-control" id="passwordIn" placeholder="пароль" name="password" onChange={changeHandler} />
                    </div>   
                </form>
                <button type="submit" className="btn btn-primary" id = "registrbut" onClick={changeStyle} >Регистрация</button>
                <button type="submit" className="btn btn-primary" id = "loginbut" onClick={loginHendler} disabled = {loading} >Вход</button>
            </div>
        </div>
    )
}