import { useRecoilState } from "recoil"
import { userToken } from "../../atoms/userToken"
import { LogIn } from "../Login/LogIn"
import { storageState } from "../../atoms/storageState"
import api from "../../connection/api"
import { useEffect, useState } from "react"
import { Storage } from "../Storage/Storage"
import { Loan } from "../Loan/Loan"
import { CreationLoanScreen, CreationStorageScreen } from "../CreationScreen/CreationScreen"
import { loanEditState } from "../../atoms/loanEditState"

export const Home = () => {

    // 0 - Storage
    // 1 - Loan
    const [page, setPage] = useState(1)
    const handleTogglePage = () => page == 0 ? setPage(1) : setPage(0)
    
    // controla se paginas de edição / criação estão abertas 
    const [create, setCreate] = useState(false)
    const handleToggleCreate = () => setCreate(!create)
    
    // controla se a pagina de edição/criação é do estoque ou cautela 
    const [createPage, setCreatePage] = useState(0)
    const handleToggleCreatePage = () => createPage == 0 ? setCreatePage(1) : setCreatePage(0)

    const [loaneditState, setLoanEditState] = useRecoilState(loanEditState)


 
    return (
        <div className="home">
            {(create || Object.keys(loaneditState) != 0) ? ((createPage ? <CreationStorageScreen togglePage={handleToggleCreate}/> : <CreationLoanScreen togglePage={handleToggleCreate}/>)) : null}
            {/* {(create || Object.keys(loaneditState) != 0) && (createPage ? null : <CreationLoanScreen togglePage={handleToggleCreate}/>)} */}
            {/*  */}

            <button onClick={() => {
                handleToggleCreatePage()
                handleTogglePage()
            }}>{page == 0 ? "Ficha de Cautela" : "Ficha de Estoque"}</button> <br /> <br />
            <button onClick={handleToggleCreate}>Criar novo item</button>

            <br /><br /><br />

            {page == 0 && <Storage togglePage={handleToggleCreate}/>} 
            {page == 1 && <Loan togglePage={handleToggleCreate}/>}
        </div>
    )
}
