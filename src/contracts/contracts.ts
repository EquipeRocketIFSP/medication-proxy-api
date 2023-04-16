namespace Contracts {
    export interface RegisterNumberAPIResponse {
        content: {
            processo: {
                numero: string
            }
        }[]
    }

    export interface MedicationAPIResponse {
        nomeComercial: string,
        numeroRegistro: string,
        principioAtivo: string,
        apresentacoes: MedicationApresentation[]
    }

    export interface MedicationApresentation {
        apresentacao: string,
        viasAdministracao: string[]
    }
}

export default Contracts;