import {Injectable} from '@nestjs/common';
import axios, {AxiosHeaders, AxiosRequestConfig} from "axios";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import Contracts from "../../contracts/contracts";

@Injectable()
export class AnvisaApiService {
    private static readonly API_RESOURCE = 'https://consultas.anvisa.gov.br/api/consulta/medicamento/produtos';
    private static AXIOS_CONFIG: AxiosRequestConfig;

    constructor() {
        const headers = new AxiosHeaders().setAuthorization('Guest');
        const httpsAgent = new https.Agent({
            ca: [
                fs.readFileSync(path.resolve('resources', 'GlobalSign.crt')),
                fs.readFileSync(path.resolve('resources', 'GlobalSign RSA OV SSL CA 2018.crt')),
                fs.readFileSync(path.resolve('resources', 'anvisa.gov.br.crt'))
            ]
        });

        AnvisaApiService.AXIOS_CONFIG = {
            headers,
            httpsAgent,
            timeout: 30000
        }
    }

    public async getProcessNumberByRegisterNumber(registerNumber: string): Promise<string> {
        const url = `${AnvisaApiService.API_RESOURCE}?count=10&filter[numeroRegistro]=${registerNumber}&page=1`;
        const {data} = await axios.get<Contracts.RegisterNumberAPIResponse>(url, AnvisaApiService.AXIOS_CONFIG);

        return data.content[0].processo.numero;
    }

    public async getMedicationsByProcessNumber(processNumber: string): Promise<Contracts.MedicationAPIResponse> {
        const url = `${AnvisaApiService.API_RESOURCE}/${processNumber}`;
        const {data} = await axios.get<Contracts.MedicationAPIResponse>(url, AnvisaApiService.AXIOS_CONFIG);

        return data;
    }
}
