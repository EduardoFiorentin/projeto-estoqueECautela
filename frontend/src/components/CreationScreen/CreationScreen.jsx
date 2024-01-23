import { useEffect, useState } from "react"
import api from "../../connection/api"
import { useRecoilState, useRecoilValue } from "recoil"
import { userToken } from "../../atoms/userToken"
import { loanEditState } from "../../atoms/loanEditState"
import { loanState } from "../../atoms/loanState"
import { storageEditState } from "../../atoms/storageEditState"
import { storageState } from "../../atoms/storageState"
import { errorMessage } from "../../utils/ErrorHandling/errorMessage"
import { errorHandler } from "../../utils/ErrorHandling/errorHandler"
import { sucessHandler } from "../../utils/SucessHandling/sucessHandler"

import '../../assets/style/creationScreen.sass'

const CATEGORY = {
    "1": "Vestuário Tático",
    "2": "Armamento e Munição",
    "3": "Equipamento de Comunicação",
    "4": "Equipamento de Sobrevivência",
    "5": "Equipamento de Missões Especiais",
    "6": "Veículos Militares",
    "7": "Equipamentos de Engenharia",
    "8": "Equipamento de Inteligência e Vigilância",
    "9": "Equipamento Médico Militar",
    "10": "Equipamento de Logística",
    "11": "Equipamento de Treinamento",
    "12": "Equipamento de Sapa",
    "13": "Outros"
}

const ENUM_LOAN_STATUS = {
    "Não retirado": "1",
    "Cautelado": "2",
    "Descautelado": "3"
}
const ENUM_STORAGE_CATEGORY = {

}

const CreationLoanScreen = ({togglePage}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [conditions, setConditions] = useState('')
    const [provider, setProvider] = useState('')
    const [receiver, setReceiver] = useState('')
    const [status, setStatus] = useState('2')
    
    const token = useRecoilValue(userToken)
    
    const [editMode, setEditMode] = useState(false)
    const [loaneditState, setLoanEditState] = useRecoilState(loanEditState)
    const [loan, setLoan] = useRecoilState(loanState)
    
    useEffect(() => {
        if (Object.keys(loaneditState).length != 0) {
            setEditMode(true)
            setName(loaneditState.name)
            setDescription(loaneditState.description)
            setConditions(loaneditState.conditions)
            setProvider(loaneditState.provider)
            setReceiver(loaneditState.receiver)
            setStatus(loaneditState.status)
            console.log("status: ", status, loaneditState)
        }
    }, [])

    
    const exitPage = () => editMode ? setLoanEditState({}) : togglePage()

    const handleCreateObject = () => {
        if (name && description && conditions && provider && receiver && status) {
            const obj = {
                name, description, conditions, provider, receiver, status
            }
            api.post('/loan', obj, {headers: {Authorization: token}})
            .then(res => {
                console.log(res.data)
                getLoanData() 
                exitPage()
                sucessHandler(res)
            })
            .catch(err => errorHandler(err)) 
        } else {
            errorMessage("Não há dados suficientes!")
        }
    }


    //refatorar - usado em Loan e creationScreen
    const getLoanData = () => {
        api.get("/loan", {headers: {Authorization: token}})
        .then(data => {
            setLoan(data.data.items)
        })
        .catch(err => errorHandler(err))
    }

    const handleUpdateObject = () => {
        let modObj = {}
        const actValues = {name, description, conditions, provider, receiver, status}
        Object.keys(actValues).map(key => {if (loaneditState[key] !== actValues[key]) modObj[key] = actValues[key]})

        // atualizar db e exibição
        api.put(`/loan/${loaneditState.id}`, modObj, {headers: {Authorization: token}})
            .then(res =>{
                console.log(res.data)
                setLoanEditState({})
                getLoanData()
                exitPage()
                sucessHandler(res)
            })
            .catch(err => errorHandler(err))
    }


    return (
        <div className="creation__screen">
            <h2 className="creation__title">{editMode? "Modificar Cautela" : "Adicionar à cautela"}</h2>
            
            {editMode ? <div>Item: <p>nome: {loaneditState.name}</p><p>id: {loaneditState.id}</p></div>: null}  

            <label htmlFor="" className="">Nome</label>
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>

            <label htmlFor="" className="">Descrissão</label>
            <textarea name="" id="" cols="30" rows="10" value={description} onChange={event => setDescription(event.target.value)}></textarea>

            <label htmlFor="" className="">Condições do material</label>
            <input type="text"  value={conditions} onChange={event => setConditions(event.target.value)}/>

            <label htmlFor="" className="">Cautelador</label>
            <input type="text"  value={provider} onChange={event => setProvider(event.target.value)}/>

            <label htmlFor="" className="">Cautelando</label>
            <input type="text"  value={receiver} onChange={event => setReceiver(event.target.value)}/>

            <label htmlFor="" className="">Status da cautela</label>
            <select name="" id="" onChange={item => setStatus(item.target.value)} defaultValue={ENUM_LOAN_STATUS[status]}>
                <option value="1">Não retirado</option>
                <option value="2">Cautelado</option>
                <option value="3">Descautelado</option>
            </select>
            <button onClick={() => editMode ? handleUpdateObject() : handleCreateObject()}>Criar</button>
            <button onClick={exitPage}>Fechar</button>
        </div>
    )
}



const CreationStorageScreen = ({togglePage}) => {

    const [name, setName] = useState('')
    const [qtd, setQtd] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('1')
    
    const token = useRecoilValue(userToken)
    
    
    const [editMode, setEditMode] = useState(false)
    const [storageeditState, setStorageEditState] = useRecoilState(storageEditState)
    const [storage, setStorage] = useRecoilState(storageState)
    
    useEffect(() => {
        if (Object.keys(storageeditState).length != 0) {
            setEditMode(true)
            setName(storageeditState.name)
            setQtd(parseInt(storageeditState.qtd))
            setDescription(storageeditState.description)
            setCategory(storageeditState.category)

        }
    }, [])
    
    const exitPage = () => editMode ? setStorageEditState({}) : togglePage() 

    const handleCreateObject = () => {
        if (name && qtd && description && category) {
            setQtd(parseInt(qtd))
            const obj = {
                name, qtd, description, category
            }

        // refatorar - ta cachorro 
        if (obj.qtd != undefined) obj.qtd = parseInt(obj.qtd)   

            api.post('/storage', obj, {headers: {Authorization: token}})
            .then(res =>{
                console.log(res.data)
                getStorageData()
                exitPage() 
                sucessHandler(res)
            })
            .catch(err => errorHandler(err)) 
        } else {
            errorMessage("Não há dados o suficiente")
        }
    }



    const getStorageData = () => {
        api.get("/storage", {headers: {Authorization: token}})
        .then(data => setStorage(data.data.items))
        .catch(err => errorHandler(err))
    }

    const handleUpdateObject = () => {
        let modObj = {} 
        const actValues = {name, qtd, description, category}
        Object.keys(actValues).map(key => {if (storageeditState[key] !== actValues[key]) modObj[key] = actValues[key]})
        

        // refatorar - ta cachorro 
        if (modObj.qtd != undefined) modObj.qtd = parseInt(modObj.qtd)

        api.put(`/storage/${storageeditState.id}`, modObj, {headers: {Authorization: token}})
            .then(res =>{
                console.log(res.data)
                setStorageEditState({})
                getStorageData()
                exitPage()
                sucessHandler(res)
            })
            .catch(err => errorHandler(err))

    }

    return (
        <div className="creation__screen">
            <h2 className="creation__title">{editMode? "Modificar Estoque" : "Adicionar ao Estoque"}</h2>
            {editMode ? <div>Item: <p>nome: {storageeditState.name}</p><p>id: {storageeditState.id}</p></div>: null}  
            
            <label htmlFor="" className="">Nome</label>
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            
            <label htmlFor="" className="">Quantidade</label>
            <input type="number" value={qtd} onChange={event => setQtd(event.target.value)}/>

            <label htmlFor="" className="">Descrissão</label>
            <textarea name="" id="" cols="30" rows="10" value={description} onChange={event => setDescription(event.target.value)}></textarea>

            <label htmlFor="" className="">Categoria</label>
            <select name="" id="" onChange={item => setCategory(item.target.value)} value={category} defaultValue={category}>
                {
                    Object.keys(CATEGORY).map(key => <option value={key}>{CATEGORY[key]}</option>)
                }
               
            </select>
            <button onClick={() => editMode ? handleUpdateObject() : handleCreateObject()}>Criar</button>
            <button onClick={exitPage}>Fechar</button>
        </div>
    )
}

export {
    CreationLoanScreen,
    CreationStorageScreen
}