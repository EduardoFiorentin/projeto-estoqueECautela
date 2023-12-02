import { useEffect, useState } from "react"
import "./style.css"
import api from "../../connection/api"
import { useRecoilValue } from "recoil"
import { userToken } from "../../atoms/userToken"

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

const CreationLoanScreen = ({togglePage, itemData, setItemData}) => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [conditions, setConditions] = useState('')
    const [provider, setProvider] = useState('')
    const [receiver, setReceiver] = useState('')
    const [status, setStatus] = useState('1')

    const [initialValues, setInitialValues] = useState({})

    const [editMode, setEditMode] = useState(false)

    const token = useRecoilValue(userToken)

    const handleCreateObject = () => {
        if (name && description && conditions && provider && receiver && status) {
            const obj = {
                name, description, conditions, provider, receiver, status
            }
            api.post('/loan', obj, {headers: {Authorization: token}})
            .then(res => console.log(res.data))
            .catch(res => console.log(res.response.data)) 
        } else {
            console.log("Não há dados o suficiente")
        }
    }

    const handleUpdateObject = () => {
        let modObj = {}
        const actValues = {name, description, conditions, provider, receiver, status}
        console.log(actValues)
        Object.keys(actValues).map(key => {
            if (initialValues[key] !== actValues[key]) modObj[key] = actValues[key]
            console.log(2)
            console.log(key, initialValues[key], actValues[key], initialValues[key] !== actValues[key])
        })

        console.log(modObj)
    }

    useEffect(() => {
        if (itemData) {
            setEditMode(true)
            setName(itemData.name)
            setDescription(itemData.description)
            setConditions(itemData.conditions)
            setProvider(itemData.provider)
            setReceiver(itemData.receiver)
            setStatus(itemData.status)
            // togglePage()
            console.log("item data")

            setInitialValues({
                name: itemData.name,
                description: itemData.description, 
                conditions: itemData.conditions, 
                provider: itemData.provider, 
                receiver: itemData.receiver, 
                status: itemData.status
            })
        }

        // console.log(initialValues)
    }, [])

    return (
        <div className="creation__screen">
            <h2 className="creation__title">{editMode? "Modificar Cautela" : "Adicionar à cautela"}</h2>
            
            {editMode ? <p>Item: {itemData.id}</p> : null}

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
            <select name="" id="" onChange={item => setStatus(item.target.value)}>
                <option value="1">Não retirado</option>
                <option value="2">Cautelado</option>
                <option value="3">Descautelado</option>
            </select>
            <button onClick={() => editMode ? handleUpdateObject() : handleCreateObject()}>Criar</button>
            <button onClick={() => {
                togglePage()
                setItemData({}) 
            }}>Fechar</button>
        </div>
    )
}
const CreationStorageScreen = ({togglePage}) => {

    const [name, setName] = useState('')
    const [qtd, setQtd] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('1')

    const token = useRecoilValue(userToken)

    const handleCreateObject = () => {
        if (name && qtd && description && category) {
            setQtd(parseInt(qtd))
            // console.log(qtd)
            const obj = {
                name, qtd, description, category
            }
            api.post('/storage', obj, {headers: {Authorization: token}})
            .then(res => console.log(res.data))
            .catch(res => console.log(res.response.data)) 
        } else {
            console.log("Não há dados o suficiente")
        }
    }

    return (
        <div className="creation__screen">
            <h2 className="creation__title">Adicionar ao estoque</h2>
            
            <label htmlFor="" className="">Nome</label>
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            
            <label htmlFor="" className="">Quantidade</label>
            <input type="number" value={qtd} onChange={event => setQtd(event.target.value)}/>

            <label htmlFor="" className="">Descrissão</label>
            <textarea name="" id="" cols="30" rows="10" value={description} onChange={event => setDescription(event.target.value)}></textarea>

            <label htmlFor="" className="">Categoria</label>
            <select name="" id="" onChange={item => setCategory(item.target.value)}>
                {
                    Object.keys(CATEGORY).map(key => <option value={key}>{CATEGORY[key]}</option>)
                }
               
            </select>
            <button onClick={handleCreateObject}>Criar</button>
            <button onClick={togglePage}>Fechar</button>
        </div>
    )
}

export {
    CreationLoanScreen,
    CreationStorageScreen
}