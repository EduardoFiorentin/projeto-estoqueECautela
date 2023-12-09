import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { loanState } from "../../atoms/loanState"
import api from "../../connection/api"
import { useEffect } from "react"
import { loanEditState } from "../../atoms/loanEditState"

export const Loan = () => {
    const [token, setToken] =  useRecoilState(userToken)
    const [loan, setLoan] = useRecoilState(loanState)
    const [loaneditState, setloaneditState] = useRecoilState(loanEditState)

    // refatorar - usado em Storage e Loan
    const handleLogOut = () => {
        setToken('')
        localStorage.removeItem("system_token")
        return <LogIn/>
    }

    //refatorar - usado em Loan e creationScreen
    const getLoanData = () => {
        api.get("/loan", {headers: {Authorization: token}})
        .then(data => setLoan(data.data.items))
        .catch(err => console.log(err.response.data))
    }

    useEffect(() => {
        getLoanData()
    }, [])


    return (
        <> 
            <h1>Loan</h1>
            <button onClick={getLoanData}>Update From DataBase</button>
            {
            loan.length != 0 
            ?
                <table>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nome</th>
                        <th>Descrissão</th>
                        <th>Condições</th>
                        <th>Provedor</th>
                        <th>Receptor</th>
                        <th>Situação da cautela</th>
                        <th>Opções</th>
                    </tr>
                {loan.map(item => {
                        return (
                            <tr>
                                {/* <th>{item.id}</th> */}
                                <th>{item.name}</th>
                                <th>{item.description}</th>
                                <th>{item.conditions}</th>
                                <th>{item.provider}</th>
                                <th>{item.receiver}</th>
                                <th>{item.status}</th>
                                <th>
                                    <button>Excluir</button>
                                    <button onClick={() => {
                                        setloaneditState(item)
                                        }}>Editar</button>
                                </th>
                            </tr>
                        )
                    }) }
                </table>
            : 
            <p>Sem itens</p>
            
            }
            <br /><button onClick={handleLogOut}>LogOut</button>
        </>
    )
}