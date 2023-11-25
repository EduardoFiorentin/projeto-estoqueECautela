import "./style.css"

const CreationLoanScreen = ({togglePage}) => {
    return (
        <div className="creation__screen">
            <h2 className="creation__title">Adicionar ao estoque</h2>
            
            <label htmlFor="" className="">Nome</label>
            <input type="text" />

            <label htmlFor="" className="">Descrissão</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>

            <label htmlFor="" className="">Condições do material</label>
            <input type="text" />

            <label htmlFor="" className="">Cautelador</label>
            <input type="text" />

            <label htmlFor="" className="">Cautelando</label>
            <input type="text" />

            <label htmlFor="" className="">Status da cautela</label>
            <select name="" id="">
                <option value="1">Não retirado</option>
                <option value="2">Cautelado</option>
                <option value="3">Descautelado</option>
            </select>
            <button>Criar</button>
            <button>Fechar</button>
        </div>
    )
}
const CreationStorageScreen = () => {
    return (
        <div className="creation__screen">
            <h2>Adicionar à cautela</h2>
            
        </div>
    )
}

export {
    CreationLoanScreen,
    CreationStorageScreen
}