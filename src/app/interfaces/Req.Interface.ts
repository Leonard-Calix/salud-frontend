export interface Req {
    monitoreo?: Monitoreo
    form2?: Form2
    form3?: Form3
    form4?: Form4
    form5?: Form5
    form6?: Form6
    form7?: Form7
    form8?: Form8
    form9?: Form9
    form10?: Form10
    form11?: Form11
    form12?: Form12
    form13?: Form13
    form14?: Form14
    form15?: Form15
    form16?: Form16
    form17?: Form17
}

export interface Monitoreo {
    communityId: number
    famPriorizadas: number
}

export interface Form2 {
    ejecutadas: number
    programadas: number
}

export interface Form3 {
    madre: number
    padre: number
    abuela: number
    total: number
}

export interface Form4 {
    antes: number
    despues: number
    semanas: number
}

export interface Form5 {
    hospital: string
    comunidad: string
    consulta: number
}

export interface Form6 {
    sinLactancia: number
    conLactancia: number

}

export interface Form7 {
    rango1: number
    rango2: number
    rango3: number
    masculino: number
    femenino: number
}

export interface Form8 {
    inscritos: number
    noInscritos: number
}

export interface Form9 {
    hepatitis: number
    bcg: number
    pentavalente: number
    rotavirus: number
    srp: number
    nuemococo: number
}

export interface Form10 {
    lencas: number
    tolupan: number
    chortis: number
    mestizo: number
    tawaka: number
    garifuna: number
    otros: number
}

export interface Form11 {
    normal: number
    moderada: number
    severo: number
    otro: number
}

export interface Form12 {
    noDesnutridos: number
    desnutridos: number
}

export interface Form13 {
    usoGuia: number
    nousoGuia: number
}

export interface Form14 {
    intervino: number
    noIntervino: number
}

export interface Form15 {
    conSeguimiento: number
    sinSeguimiento: number
}

export interface Form16 {
    desarrolladas: number
    noDesarrolladas: number
    supervisor: string
}

export interface Form17 {
    guia1PEmbarazo: number
    guia2PNacimiento: number
    guia3PPrimerMes: number
    guia4P1A3Meses: number
    guia5P4A6Meses: number
    guia6P6A8Meses: number
    guia7P9A12Meses: number
    guia8P12A17Meses: number
    guia9P18A23Meses: number
    guia10P2A3Anios: number
    guia11P3Anios: number
    guia12P4Anios: number
    guia13P5Anios: number
    guia14P4Anios: number
}
