import React from 'react'
import style from './Login.module.css'

const Login = ({title}) => {
    return (
        <div className={style.testClass}>
            LoginPage<br/>
            {title}
        </div>
    )
}

export default Login
