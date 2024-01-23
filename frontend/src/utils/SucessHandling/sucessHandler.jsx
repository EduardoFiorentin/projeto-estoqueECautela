import { sucessMessage } from "./sucessMessage"

export const sucessHandler = res => {
    return sucessMessage(res.data.message)
}