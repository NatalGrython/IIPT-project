import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import { StyleContext } from '../context/StyleContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/messege.hook'

export const Register = () => {

    const {request, loading, error, clearError} = useHttp()
    const message = useMessage()
    const Auth = useContext(AuthContext)
    
    const [form, setForm] = useState({
        email:'',
        password:'',
        passwordValid:'',
        checks: false
    })

    const StyleApi = useContext(StyleContext)

    useEffect ( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const typesChange = event => {
        if(event.target.type === "checkbox"){
            return (!form.checks)
        } else {
            return event.target.value
        }
    }
    
    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]: typesChange(event),
            
        })
    }

    const updateAuth = (userId, token) => {
        Auth.getAutificated(true)
        localStorage.getItem(userId, token)
    }

    const registrHendler = async () => {
        try {
            console.log('==================== REGISTR HENDLER ===========================')
            const data = await request('/api/auth/registr', 'POST', {...form})
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
        if (StyleApi.stylesFlag) {
            return {display:"none"}
        } else {
            return {display:"block"}
        }
    }

    const style = definStyle()

    return (
        <div className="jumbotron" id ="register" style = {style}>
            <h1 className = "mx-auto">Регистрация</h1>
            <div className="mx-auto">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email"  onChange={changeHandler}/>
                        <small id="emailHelp" className="form-text text-muted">Не дадим ваш пароль никому</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Пароль </label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль" name="password" onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Подвтверждение пароля </label>
                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Подверждение" name="passwordValid" onChange={changeHandler} />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" checked = {form.checks} onChange = {changeHandler} name = "checks" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1" style={{marginBottom:"10px"}}>Мне есть 18</label>
                    </div>    
                </form>
                <button type="submit" className="btn btn-primary" onClick={registrHendler} disabled = {loading}>Нажми</button>
                <button type="submit" className="btn btn-outline-danger" style = {{marginLeft:"10px"}} onClick = {changeStyle}>Вход</button>
            </div>
        </div>
    )
}