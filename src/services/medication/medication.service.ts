import {ConflictException, Injectable, Logger} from '@nestjs/common';
import Medication from "../../models/medication";
import {AnvisaApiService} from "../anvisa-api/anvisa-api.service";
import MedicineDto from "../../dtos/medicine.dto";
import {AWSDynamoQueueService} from "../aws-dynamo-queue/aws-dynamo-queue.service";
import {MikroORM} from "@mikro-orm/core";

@Injectable()
export class MedicationService {
    constructor(
        private readonly orm: MikroORM,
        private readonly anvisaApiService: AnvisaApiService,
        private readonly awsQueueService: AWSDynamoQueueService
    ) {
    }

    public async create(dto: MedicineDto): Promise<Medication> {
        const emFork = this.orm.em.fork();
        const response = await emFork.findOne(Medication, {codigoRegistro: dto.numero_registro});

        if (response) {
            await this.awsQueueService.delete(dto.numero_registro);
            throw new ConflictException();
        }

        const processNumber = await this.anvisaApiService.getProcessNumberByRegisterNumber(dto.numero_registro);
        const medicationResponse = await this.anvisaApiService.getMedicationsByProcessNumber(processNumber);

        const medication = Medication.factoryFromAnvisaAPIResponse(medicationResponse);

        await emFork.persistAndFlush(medication);
        await this.awsQueueService.delete(dto.numero_registro);

        return medication;
    }

    public async addToQueue(dto: MedicineDto): Promise<void> {
        await this.awsQueueService.add(dto.numero_registro);
    }

    private async handlePendingMedications(): Promise<void> {
        const dto = new MedicineDto();
        const logger = new Logger();
        const data = await this.awsQueueService.getAll();

        logger.log('Processando fila de medicamentos');

        for (const item of data) {
            try {
                dto.numero_registro = item['registerNumber']['S'];

                const medication = await this.create(dto);
                logger.log(`${medication.nome} - ${medication.codigoRegistro} criado com sucesso`);
            } catch (e) {
                logger.warn(`Não foi possivel criar o medicamento ${dto.numero_registro}`);
                logger.error(e);
            }
        }
    }
}
