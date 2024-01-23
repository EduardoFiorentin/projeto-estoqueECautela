import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { loanState } from "../../atoms/loanState"
import api from "../../connection/api"
import { useEffect, useState } from "react"
import { loanEditState } from "../../atoms/loanEditState"
import { formatData } from "../../utils/formatData"
import { errorHandler } from "../../utils/ErrorHandling/errorHandler"
import { sucessHandler } from "../../utils/SucessHandling/sucessHandler"


import '../../assets/style/table.sass'

export const Loan = () => {
    const [token, setToken] =  useRecoilState(userToken)
    const [loan, setLoan] = useRecoilState(loanState)
    const [loaneditState, setloaneditState] = useRecoilState(loanEditState)
    
    // controle de filtros 
    const [loanFilter, setLoanFilter] = useState([])
    const [filter, setFilter] = useState('')

    // refatorar - usado em Storage e Loan
    const handleLogOut = () => {
        setToken('')
        localStorage.removeItem("system_token")
        localStorage.removeItem("user_info")
        return <LogIn/>
    }

    //refatorar - usado em Loan e creationScreen
    const getLoanData = () => {
        api.get("/loan", {headers: {Authorization: token}})
        .then(data => setLoan(data.data.items))
        .catch(err => errorHandler(err))
    }

    const handleDeleteItem = id => {
        api.delete(`/loan/${id}`, {headers: {Authorization: token}})
        .then(data => {
            getLoanData()
            sucessHandler(data)
        })
        .catch(err => errorHandler(err))
    }

    useEffect(() => {
        getLoanData()
    }, [])


    // filtros de busca

    // Gerar regex para fazer o teste do filtro de pesquisa 
    const test = name => { 
        return (new RegExp(`${filter}`, 'gi').test(name))
    }

    useEffect(() => {
        setLoanFilter(loan.filter(item => test(item.name)))
    }, [filter, loan])

    return (
        <> 
            <div className="filter__container">
                <p className="filter__text">Filtro</p>
                <input type="text" name="" id="" className="filter__input" value={filter} onChange={event => setFilter(event.target.value)}/>
                <button onClick={() => setFilter('')}>Limpar</button>
            </div>

            <button onClick={getLoanData} className="home__button">Update From DataBase</button>

            {
            loan.length != 0 
            ?
                <table className="table">
                    <tr className="table__header">
                        <th className="table__header-item table__header-item--loan table__header-loan-name">Nome</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-date">Data</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-desc">Descrissão</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-cond">Condições</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-prov">Provedor</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-rec">Receptor</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-sit">Situação da cautela</th>
                        <th className="table__header-item table__header-item--loan table__header-loan-opt">Opções</th>
                    </tr>
                {console.log(loan)}

                {(loanFilter ? loanFilter : loan).map(item => {
                        return (
                            <tr className="table__row">
                                <th className="table__row-item">{item.name}</th>
                                <th className="table__row-item">{formatData(item.loan_date)}</th>
                                <th className="table__row-item">{item.description}</th>
                                <th className="table__row-item">{item.conditions}</th>
                                <th className="table__row-item">{item.provider}</th>
                                <th className="table__row-item">{item.receiver}</th>
                                <th className="table__row-item">{item.status}</th>
                                <th className="table__row-item table__row-buttons">
                                    <button  className="table__button table__button--delete"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >Excluir</button>
                                    <button className="table__button table__button--edit"
                                        onClick={() => {
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
            <button onClick={handleLogOut} className="home__button">LogOut</button>
        </>
    )
}