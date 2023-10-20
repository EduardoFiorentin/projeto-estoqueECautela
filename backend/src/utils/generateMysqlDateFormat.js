function generateMysqlDateFormat() {
    const data = new Date();

    const ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    if (mes < 10) {
        mes = '0' + mes;
    }
    let dia = data.getDate();
    if (dia < 10) {
        dia = '0' + dia;
    }

    let horas = data.getHours();
    if (horas < 10) {
        horas = '0' + horas;
    }
    let minutos = data.getMinutes();
    if (minutos < 10) {
        minutos = '0' + minutos;
    }
    let segundos = data.getSeconds();
    if (segundos < 10) {
        segundos = '0' + segundos;
    }

    const dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    return dataFormatada;
}

module.exports = generateMysqlDateFormat