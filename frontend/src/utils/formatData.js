export const formatData = dataString => {
    var data = new Date(dataString)
    return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`
}
