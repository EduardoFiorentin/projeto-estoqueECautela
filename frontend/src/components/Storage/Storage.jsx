import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { storageState } from "../../atoms/storageState"
import api from "../../connection/api"
import { useEffect } from "react"
import { storageEditState } from "../../atoms/storageEditState"

export const Storage = () => {

    const [token, setToken] =  useRecoilState(userToken)
    const [storage, setStorage] = useRecoilState(storageState)
    const [storageeditState, setStorageEditState] = useRecoilState(storageEditState)

    // refatorar - usado em Storage e Loan
    const handleLogOut = () => {
        setToken('')
        localStorage.removeItem("system_token")
        return <LogIn/>
    }

    const getStorageData = () => {
        api.get("/storage", {headers: {Authorization: token}})
        .then(data => setStorage(data.data.items))
        .catch(err => console.log(err.response.data))
    }

    useEffect(() => {
        getStorageData()
    }, [])


    return (
        <>
            <h1>Storage!</h1>

            <button onClick={getStorageData}>Update From DataBase</button>
            {
            storage.length != 0 
            ?
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th> 
                        <th>Descrissão</th>
                        <th>Categoria</th>
                        <th>Opções</th>
                    </tr>
                {storage.map(item => {
                        return (
                            <tr>
                                <th>{item.name}</th>
                                <th>{item.qtd}</th>
                                <th>{item.description}</th>
                                <th>{item.category}</th>
                                <th>
                                    <button>Excluir</button>
                                    <button
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
            <br /><button onClick={handleLogOut}>LogOut</button>
        </>
    )
}