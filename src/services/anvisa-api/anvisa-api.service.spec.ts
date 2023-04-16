import {Test, TestingModule} from '@nestjs/testing';
import {AnvisaApiService} from './anvisa-api.service';

describe('AnvisaApiService', () => {
    let service: AnvisaApiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AnvisaApiService],
        }).compile();

        service = module.get<AnvisaApiService>(AnvisaApiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should returns the correct register number from medcine', async () => {
        const response = await service.getProcessNumberByRegisterNumber('103920201');

        expect(response).toBe('25351853542201866');
    });
});
