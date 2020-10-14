import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const Authpage = () => {

    const {request} = useHttp()
    
    const [form, setForm] = useState({
        email:'',
        password:''
    })

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]:event.target.value 
        })
        console.log(form)
    }

    const registrHendler = async () => {
        try {
            console.log('==================== REGISTR HENDLER ===========================')
            const data = await request('http://localhost:5000/api/auth/registr', 'POST', {...form})
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
                                <input type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email"  onChange={changeHandler}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Пароль епта</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={changeHandler} />
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1" style={{marginBottom:"10px"}}>Мне есть 18</label>
                            </div>
                            
                        </form>
                    <button type="submit" className="btn btn-primary" onClick={registrHendler}>Нажми</button>
                </div>
            </div>
            
        </div>
    )
}