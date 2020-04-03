import { CronPositionDto } from './../cron-models';
import { Component, OnInit } from '@angular/core';
import { CommonValueDto } from '../cron-models';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-cron-demo',
  templateUrl: './cron-demo.component.html',
  styleUrls: ['./cron-demo.component.less']
})
export class CronDemoComponent implements OnInit {

  cronExpress = '';

  tempCronExpress: string; // 1-7 * * * * ? *   * * * * * ? *
  selectedIndex = 0;

  secondValue: string;
  minuteValue: string;
  hourValue: string;
  dayValue: string;
  monthValue: string;
  weekValue: string;
  yearValue: string;

  constructor(
    public message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.tempCronExpress = this.cronExpress || '* * * * * ? *';
    this.setAllTypeValue();
  }

  cronValueChange(valueDto: CommonValueDto) {
    // console.log($event);
    switch (valueDto.type) {
      case 'second':
        this.cronHandler(0, valueDto.value);
        break;
      case 'minute':
        this.cronHandler(1, valueDto.value);
        break;
      case 'hour':
        this.cronHandler(2, valueDto.value);
        break;
      case 'day':
        this.cronHandler(3, valueDto.value, valueDto.type);
        break;
      case 'month':
        this.cronHandler(4, valueDto.value);
        break;
      case 'week':
        this.cronHandler(5, valueDto.value, valueDto.type);
        break;
      case 'year':
        this.cronHandler(6, valueDto.value);
        break;
      default:
        break;
    }
  }

  saveCronExpress() {
    this.cronExpress = this.tempCronExpress;
  }

  resetCronExpress() {
    this.cronExpress = '';
    this.tempCronExpress = '* * * * * ? *';
    this.analysisCronExpress();
  }

  analysisCronExpress() {
    if (!this.validateCronExpress(this.cronExpress)) {
      this.tempCronExpress = '* * * * * ? *';
      return;
    }
    // this.tempCronExpress = this.cronExpress;
    this.setAllTypeValue();
  }

  private validateCronExpress(cronExp: string) {
    cronExp = cronExp || '* * * * * ? *';
    const temp = cronExp.split(' ');
    if (!temp || temp.length !== 6 && temp.length !== 7) {
      this.message.warning('非法的cron表达式，请检查后重试！');
      return false;
    }
    return true;
  }

  private cronHandler(index: number, value: string, type?: CronPositionDto) {
    const array = this.tempCronExpress.split(' ');
    if (type === 'day') {
      array[5] = '?';
    }
    if (type === 'week' && (array[3] !== '*' || value !== '?')) {
      array[3] = '?';
    }
    array[index] = value;
    this.tempCronExpress = array.join(' ');
  }

  private setAllTypeValue() {
    if (!this.cronExpress) {
      this.secondValue = this.minuteValue = this.hourValue = this.dayValue = this.monthValue = this.yearValue = '*';
      this.weekValue = '?';
    } else {
      const tempArray = this.cronExpress.split(' ');
      this.secondValue = tempArray[0] || '*';
      this.minuteValue = tempArray[1] || '*';
      this.hourValue = tempArray[2] || '*';
      this.dayValue = tempArray[3] || '*';
      this.monthValue = tempArray[4] || '*';
      this.weekValue = tempArray[5] || '?';
      this.yearValue = tempArray[6] || '*';

    }
  }

}
