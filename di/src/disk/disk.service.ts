import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private poswerService: PowerService) {}

  getData() {
    console.log('Power servise disk servise');
    this.poswerService.supplyPower(20);

    return 'data';
  }
}
