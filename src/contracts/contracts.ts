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
        medicamentoReferencia: string,
        dataVencimentoRegistro: string,
        apresentacoes: MedicationApresentation[]
        empresa: {
            razaoSocial: string
        }
    }

    export interface MedicationApresentation {
        apresentacao: string,
        viasAdministracao: string[]
    }
}

export default Contracts;