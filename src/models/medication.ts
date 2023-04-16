import Contracts from "../contracts/contracts";
import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity({tableName: 'medicamento'})
export default class Medication {
    @PrimaryKey({name: 'id', autoincrement: true, columnType: 'bigint'})
    public id: number;

    @Property({name: 'codigo_registro', unique: true})
    public codigoRegistro: string;

    @Property({name: 'nome'})
    public nome: string;

    @Property({name: 'principio_ativo'})
    public principioAtivo: string;

    @Property({name: 'via_uso'})
    public viaUso: string;

    @Property({name: 'concentracao'})
    public concentracao: string;

    public static factoryFromAnvisaAPIResponse(data: Contracts.MedicationAPIResponse): Medication {
        const medication = new Medication();

        medication.nome = data.nomeComercial;
        medication.codigoRegistro = data.numeroRegistro;
        medication.principioAtivo = data.principioAtivo;
        medication.viaUso = data.apresentacoes[0].viasAdministracao[0];
        medication.concentracao = data.apresentacoes[0].apresentacao;

        return medication;
    }
}