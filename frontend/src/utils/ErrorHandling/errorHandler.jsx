import { errorMessage } from "./errorMessage"

export const errorHandler = err => {
    // erro de conexão
    if (err.code == 'ERR_NETWORK') {
        return errorMessage("Falha na conexão! Verifique sua conexão com a internet e tente novamente.")
    }


    // erro de permissão ou dados da requisição incorretos  
    else if (err.code == 'ERR_BAD_REQUEST') {
        return errorMessage(err.response.data.message)
    }
}
