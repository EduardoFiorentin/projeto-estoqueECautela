import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import { Storage } from "../Storage/Storage"
import { Loan } from "../Loan/Loan"
import { CreationLoanScreen, CreationStorageScreen } from "../CreationScreen/CreationScreen"
import { loanEditState } from "../../atoms/loanEditState"
import { storageEditState } from "../../atoms/storageEditState"

import '../../assets/style/table.sass'
import '../../assets/style/home.sass'


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
    const [storageeditState, setStorageEditState] = useRecoilState(storageEditState)

    const [userInfo, setUserInfo] = useState(JSON.parse(window.localStorage.getItem('user_info')))

    const capitalizeFirstLetter = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
 
    return (
        <div className="home">

            <div className="user">
                <div className="user__info">
                    <div className="user__img">{userInfo.user[0].toUpperCase()}</div>
                    <p className="user__name">{capitalizeFirstLetter(userInfo.user)}</p>
                </div>
            </div>

            <h1 className="home__title">{page === 0 ? "Estoque":"Cautela"}</h1>
            {(create || Object.keys(loaneditState).length != 0) ? ((createPage === 0 ? <CreationLoanScreen togglePage={handleToggleCreate}/> : null)) : null}
            {(create || Object.keys(storageeditState).length != 0) ? ((createPage === 1 ? <CreationStorageScreen togglePage={handleToggleCreate}/> : null)) : null}

            <div className="home__buttons">
                <button onClick={() => {
                    handleToggleCreatePage()
                    handleTogglePage()
                }} className="home__button">{page == 0 ? "Ficha de Cautela" : "Ficha de Estoque"}</button>
                <button onClick={handleToggleCreate} className="home__button">Criar novo item</button>
            </div>

            {page == 0 && <Storage togglePage={handleToggleCreate}/>} 
            {page == 1 && <Loan togglePage={handleToggleCreate}/>}
        </div>
    )
}
