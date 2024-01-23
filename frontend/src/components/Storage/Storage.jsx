import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { storageState } from "../../atoms/storageState"
import api from "../../connection/api"
import { useEffect, useState } from "react"
import { storageEditState } from "../../atoms/storageEditState"
import { errorHandler } from "../../utils/ErrorHandling/errorHandler"
import { sucessHandler } from "../../utils/SucessHandling/sucessHandler"

import '../../assets/style/table.sass'


export const Storage = () => {

    const [token, setToken] =  useRecoilState(userToken)
    const [storage, setStorage] = useRecoilState(storageState)
    const [storageeditState, setStorageEditState] = useRecoilState(storageEditState)

    // controle de filtros 
    const [storageFilter, setStorageFilter] = useState([])
    const [filter, setFilter] = useState('')


    // refatorar - usado em Storage e Loan
    const handleLogOut = () => {
        setToken('')
        localStorage.removeItem("system_token")
        localStorage.removeItem("user_info")
        return <LogIn/>
    }

    const getStorageData = () => {
        api.get("/storage", {headers: {Authorization: token}})
        .then(data => setStorage(data.data.items))
        .catch(err => errorHandler(err))
    }

    const handleDeleteItem = id => {
        // verificação 

        api.delete(`/storage/${id}`, {headers: {Authorization: token}})
        .then(data => {
            console.log(data.data.message)
            getStorageData()
            sucessHandler(data)
        })
        .catch(err => errorHandler(err))
    }

    useEffect(() => {
        getStorageData()
    }, [])

    // filtros de busca
    // Gerar regex para fazer o teste do filtro de pesquisa 
    const test = name => { 
        return (new RegExp(`${filter}`, 'gi').test(name))
    }

    useEffect(() => {
        setStorageFilter(storage.filter(item => test(item.name)))
    }, [filter, storage])


    return (
        <>
            <div className="filter__container">
                <p className="filter__text">Filtro</p>
                <input type="text" name="" id="" className="filter__input" value={filter} onChange={event => setFilter(event.target.value)}/>
                <button onClick={() => setFilter('')}>Limpar</button>
            </div>

            <button onClick={getStorageData} className="home__button">Update From DataBase</button>
            {
            storage.length != 0 
            ?
                <table className="table">
                    <tr className="table__header">
                        <th className="table__header-item table__header-item--storage table__header-storage-name">Nome</th>
                        <th className="table__header-item table__header-item--storage table__header-storage-qtd">Quantidade</th> 
                        <th className="table__header-item table__header-item--storage table__header-storage-desc">Descrissão</th>
                        <th className="table__header-item table__header-item--storage table__header-storage-cat">Categoria</th>
                        <th className="table__header-item table__header-item--storage table__header-storage-opt">Opções</th>
                    </tr>

                {(storageFilter ? storageFilter : storage).map(item => {
                        return (
                            <tr className="table__row">
                                <th className="table__row-item">{item.name}</th>
                                <th className="table__row-item">{item.qtd}</th>
                                <th className="table__row-item">{item.description}</th>
                                <th className="table__row-item">{item.category}</th>
                                <th className="table__row-item  table__row-buttons">
                                    <button className="table__button table__button--delete"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >Excluir</button>
                                    <button  className="table__button table__button--edit"
                                        onClick={() => setStorageEditState(item)}
                                    >Editar</button>
                                </th>
                            </tr>   
                        )
                    }) }
                </table>
            : 
            "Sem itens"
            }
            <button onClick={handleLogOut} className="home__button">LogOut</button>
        </>
    )
}