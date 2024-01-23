import { useState } from "react"
import api from "../../connection/api"
import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { errorHandler } from "../../utils/ErrorHandling/errorHandler"
import '../../assets/style/login.sass'

export const LogIn = () => {

    const [seePass, setSeePass] = useState(false)
    const [check, setCheck] = useState(false)
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [token, setToken] = useRecoilState(userToken)

    const [loading, setLoading] = useState(false)

    const handleToggleSeePass = () => setSeePass(!seePass)

    const handleSubmitLogin = () => {
        setLoading(true)
        const data = {
            login, pass
        }
        api.post('/login', data)
        .then(res => {
            setToken('Bearer '+res.data.token)
            window.localStorage.setItem("user_info", JSON.stringify(res.data.userInfo))
            if (check) window.localStorage.setItem("system_token", 'Bearer ' + res.data.token)
        })
        .catch(err => {
            errorHandler(err)
            setLoading(false)
        })
    }

    return (
        <div className="login">
            <h1 className="log__title">Acesso ao sistema</h1>
            <label htmlFor="login" className="log__login-lable">Usuário </label>
            <input type="text" name="login" id="login" maxLength={25}
                value={login}
                onChange={data => setLogin(data.target.value)}
                className="log__login-input input"/>
            <br/>
            <label htmlFor="password" className="log__password-lable">Senha </label>
            <input type={seePass ? "text":"password"} name="password" id="password" maxLength={25} minLength={5}
                value={pass}
                onChange={data => setPass(data.target.value)}
                className="log__password-input input"
            /> 

            <button onClick={() => handleToggleSeePass()} className="log__password-button">{seePass ? "Esconder senha":"Ver senha" }</button><br/> <br/>

            <input type="checkbox" name="check" id="check" checked={check} onClick={() => setCheck(!check)}/>
            <label htmlFor="check" className="">Salvar LogIn</label><br />

            <button onClick={() => handleSubmitLogin()} disabled={loading} content={loading ? "Enviando": "Enviar"} className="log__send-button">Enviar</button>
        </div>
    )
}