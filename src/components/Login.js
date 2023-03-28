import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const Login = () => {
    const [credentails, setCredentails] = useState({ email: '', password: "" })
    let navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentails.email , password: credentails.password })
        })
        const json = await response.json()
        console.log(json)
        if(json.success){
            // save auth tokken
            localStorage.setItem('tokken',json.authTokken)
            navigate('/')

        }else{
            alert('enter a correct credentails')
        }
    }

    const handleOnChang = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleOnChang} value={credentails.email} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'onChange={handleOnChang}  value={credentails.password} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
