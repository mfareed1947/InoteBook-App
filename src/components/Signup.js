import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'



export const Signup = () => {

    const [credentails, setCredentails] = useState({ name: '', email: '', password: "", cpassword: '' })
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentails
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json()
        console.log(json)
       // save auth tokken
        localStorage.setItem('tokken',json.authTokken);
        navigate('/')
    }

    const handleOnChang = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={handleOnChang} id="name" name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleOnChang} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleOnChang} minLength={5} required id="password" name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={handleOnChang} minLength={5} required id="cpassword" name='cpassword' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
