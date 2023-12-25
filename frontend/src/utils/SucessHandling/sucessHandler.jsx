import { sucessMessage } from "./sucessMessage"

export const sucessHandler = res => {
    // item criado com sucesso
    // if (res.data.code == 201) {
    //     return errorMessage("Falha na conexão! Verifique sua conexão com a internet e tente novamente.")
    // }


    // erro de permissão ou dados da requisição incorretos  
    // else if (res.code == 'ERR_BAD_REQUEST') {
    //     // console.log("Chamada mensagem")
    //     return errorMessage(res.response.data.message)
    // }

    return sucessMessage(res.data.message)

}