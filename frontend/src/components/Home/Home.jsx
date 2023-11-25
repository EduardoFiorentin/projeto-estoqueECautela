import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { storageState } from "../../atoms/storageState"
import api from "../../connection/api"
import { useEffect, useState } from "react"
import { Storage } from "../Storage/Storage"
import { Loan } from "../Loan/Loan"
import { CreationLoanScreen } from "../CreationScreen/CreationScreen"

export const Home = () => {

    // 0 - Storage
    // 1 - Loan
    const [page, setPage] = useState(1)
    const handleTogglePage = () => page == 0 ? setPage(1) : setPage(0)
    
    const [create, setCreate] = useState(false)
    const toggleCreate = () => setCreate(!create)
    
    const [createPage, setCreatePage] = useState(0)
    const toggleCreatepA

    return (
        <div className="home">
            {<CreationLoanScreen togglePage={toggleCreate}/>}
            <h1>Home!</h1> 
            <button onClick={handleTogglePage}>{page == 0 ? "Ficha de Cautela" : "Ficha de Estoque"}</button>
            {page == 0 && <Storage/>} 
            {page == 1 && <Loan/>}


        </div>
    )
}
