import { errorMessage } from "./errorMessage"

export const errorHandler = err => {
    // erro de conexão
    if (err.code == 'ERR_NETWORK') {
        errorMessage("Falha na conexão! Verifique sua conexão com a internet e tente novamente.")
    }
    // erro de permissão 
    else if (err.code == 'ERR_BAD_REQUEST') {
        errorMessage(err.response.data.message)
    }


}