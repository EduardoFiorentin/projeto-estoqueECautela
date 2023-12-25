import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { loanState } from "../../atoms/loanState"
import api from "../../connection/api"
import { useEffect } from "react"
import { loanEditState } from "../../atoms/loanEditState"
import { formatData } from "../../utils/formatData"
import { errorHandler } from "../../utils/ErrorHandling/errorHandler"
import { sucessHandler } from "../../utils/SucessHandling/sucessHandler"

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
        .catch(err => errorHandler(err))
    }

    const handleDeleteItem = id => {
        // verificação 

        console.log("Req exc")

        api.delete(`/loan/${id}`, {headers: {Authorization: token}})
        .then(data => {
            console.log(data.data)
            getLoanData()
            sucessHandler(data)
        })
        .catch(err => errorHandler(err))
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
                        <th>Data</th>
                        <th>Descrissão</th>
                        <th>Condições</th>
                        <th>Provedor</th>
                        <th>Receptor</th>
                        <th>Situação da cautela</th>
                        <th>Opções</th>
                    </tr>
                {console.log(loan)}
                {loan.map(item => {
                        return (
                            <tr>
                                {/* <th>{item.id}</th> */}
                                <th>{item.name}</th>
                                <th>{formatData(item.loan_date)}</th>
                                <th>{item.description}</th>
                                <th>{item.conditions}</th>
                                <th>{item.provider}</th>
                                <th>{item.receiver}</th>
                                <th>{item.status}</th>
                                <th>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                    >Excluir</button>
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