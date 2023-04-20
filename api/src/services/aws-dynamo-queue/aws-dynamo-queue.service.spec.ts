import { Test, TestingModule } from '@nestjs/testing';
import { AwsDynamoQueueService } from './aws-dynamo-queue.service';

describe('AwsDynamoQueueService', () => {
  let service: AwsDynamoQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsDynamoQueueService],
    }).compile();

    service = module.get<AwsDynamoQueueService>(AwsDynamoQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
