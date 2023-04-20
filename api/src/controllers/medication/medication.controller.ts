import {Body, Controller, Post} from '@nestjs/common';
import MedicineDto from "../../dtos/medicine.dto";
import {MedicationService} from "../../services/medication/medication.service";

@Controller('api/medication')
export class MedicationController {
    constructor(private medicationService: MedicationService) {
    }

    @Post()
    public async create(@Body() dto: MedicineDto) {
        await this.medicationService.addToQueue(dto);
    }
}
