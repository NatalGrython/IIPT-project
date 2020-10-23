import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/messege.hook'

export const Authpage = () => {

    const {request, loading, error, clearError} = useHttp()
    const message = useMessage()
    
    const [form, setForm] = useState({
        email:'',
        password:'',
        passwordValid:''
    })

    const [check, setCheck] = useState(false)

    const changeCheck = event => {
        setCheck(check => !check)
        console.log(check)
    }

    useEffect ( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]:event.target.value 
        })
        console.log(form)
    }

    const registrHendler = async () => {
        try {
            console.log('==================== REGISTR HENDLER ===========================')
            const data = await request('/api/auth/registr', 'POST', {...form})
            console.log('==================== REGISTR HENDLER END ===========================')
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className ="row">
            <div className = "">
                <h1 className = "mx-auto" style={{paddingLeft:"100px", paddingTop:"30px"}}>Пиздарики регайся</h1>
                <div className="mx-auto" style={{width:"500px", marginTop:"100px"}}>
                    
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Адрес мыла</label>
                                <input type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ты пидор" name="email"  onChange={changeHandler}/>
                                <small id="emailHelp" className="form-text text-muted">Не дадим ваш пароль никому</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Пароль епта</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пидор" name="password" onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Второй епта</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Хуй" name="passwordValid" onChange={changeHandler} />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1" onChange = {changeCheck} style={{marginBottom:"10px"}}>Мне есть 18</label>
                            </div>
                            
                        </form>
                    <button type="submit" className="btn btn-primary" onClick={registrHendler} disabled = {loading}>Нажми</button>
                </div>
            </div>
            
        </div>
    )
}