import { WEEK_INFO_DATASET } from './../../cron-models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CronDataItemDto, CronTypeDto, CronTypeEnum, CronPositionDto, CommonValueDto, CRON_TYPE_MAPPED } from '../../cron-models';

@Component({
  selector: 'app-week-cron-form',
  templateUrl: './week-cron-form.component.html',
  styleUrls: ['./week-cron-form.component.less']
})
export class WeekCronFormComponent implements OnInit {

  @Input() nzData: string;
  nzCronPosition: CronPositionDto = 'week';
  @Output() nzCronValueChange = new EventEmitter<CommonValueDto>();

  nzMax: number;
  /** 可选择的数据 */
  dataset: number[] = [];
  /** 根据类型显示的中文名称 */
  // nzCronTypeCN: string;

  cronType: CronTypeDto;

  weekDataset = WEEK_INFO_DATASET;

  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  editForm: FormGroup;
  editDto: CronDataItemDto;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createCronDataItemDto();

    this.initData();
    this.refreshEditFormStatus();
  }

  private initData() {
    this.nzData = this.nzData || '*';
    const tempMax = CRON_TYPE_MAPPED[this.nzCronPosition].max;
    this.nzMax = tempMax || 12;
    // this.nzCronTypeCN = CRON_TYPE_MAPPED[this.nzCronPosition].cnType;

    this.initMaxData(this.nzCronPosition);
    this.analysisCronData(this.nzData);
  }

  createCronDataItemDto(dto?: CronDataItemDto) {
    this.editForm = this.fb.group({
      cronType: ['every'],
      cronEvery: [null],
      // incrementStart: [1],
      // incrementInterval: [2],
      rangeStart: [1],
      rangeEnd: [2],
      spcifyArray: [[]],

      // dayOfMonth: [1], // 距离月底多少天
      // endOfMonth: [1]
      lastWeekday: [1],
      weekDay: [1],
      weekIndex: [1]

      // cronEvery: [''],
      // incrementType: this.fb.group({
      //   incrementStart: [1],
      //   incrementInterval: [2]
      // }),
      // rangeType: this.fb.group({
      //   rangeStart: [1],
      //   rangeEnd: [7]
      // }),
      // specifyArray: [[]]
    });
  }

  submitCronDataItemDto(event: Event) {
    if (event) {
      event.preventDefault();
    }
  }
  resetCronDataItemDto(event: Event) {
    if (event) {
      event.preventDefault();
    }
    this.editForm.reset();
  }

  cronTypeChange(type: CronTypeDto) {
    this.cronType = type;
    switch (type) {
      case CronTypeEnum.every:
        this.nzData = '*';
        break;
      case CronTypeEnum.lastDay:
        const lastDay = this.editForm.get('lastWeekday').value;
        if (lastDay === '1') {
          this.nzData = 'L';
        } else {
          this.nzData = `${lastDay}L`;
        }
        break;
      case CronTypeEnum.lastWorkday:
        const weekIndex = this.editForm.get('weekIndex').value;
        const weekday = this.editForm.get('weekDay') ? this.editForm.get('weekDay').value : 1;
        this.nzData = `${weekday}#${weekIndex}`;
        break;
      // case CronTypeEnum.interval:
      //   const incrementStart = this.editForm.get('incrementStart').value || 1;
      //   const incrementInterval = this.editForm.get('incrementInterval').value || 2;
      //   this.nzData = `${incrementStart}/${incrementInterval}`;
      //   break;
      case CronTypeEnum.range:
        const rangeStart = this.editForm.get('rangeStart').value || 1;
        const rangeEnd = this.editForm.get('rangeEnd').value || 7;
        this.nzData = `${rangeStart}-${rangeEnd}`;
        break;
      case CronTypeEnum.spcifyArray:
        const temp = this.editForm.get('spcifyArray').value;
        if (temp && temp.length) {
          this.nzData = temp.toString();
        } else {
          this.nzData = '*';
        }
        break;
      default:
        break;
    }
    this.refreshEditFormStatus();
    this.nzCronValueChange.emit({ type: this.nzCronPosition, value: this.nzData });
  }

  inputNumberChange($event) {
    const type = this.editForm.get('cronType').value;
    this.cronTypeChange(type);
  }

  selectChange($event) {
    // console.log($event);
    const type = this.editForm.get('cronType').value;
    this.cronTypeChange(type);
  }
  /** 刷新form的disabled状态 */
  refreshEditFormStatus() {
    switch (this.cronType) {
      case 'every':
        this.enabledEditForm();
        break;
      // case 'interval':
      //   this.enabledEditForm(['rangeStart', 'rangeEnd', 'spcifyArray', 'dayOfMonth', 'endOfMonth']);
      //   break;
      case 'range':
        this.enabledEditForm(['rangeStart', 'rangeEnd']);
        break;
      case 'spcifyArray':
        this.enabledEditForm(['spcifyArray']);
        break;

      case 'lastDay':
        this.enabledEditForm(['lastWeekday']);
        break;
      case 'lastWorkday':
        this.enabledEditForm(['weekIndex', 'weekDay']);
        break;
      default:
        break;
    }
  }

  enabledEditForm(enableControlArray?: string[]) {
    // cronType enable
    // for (const key in this.editForm.controls) {
    //   if (this.editForm.controls.hasOwnProperty(key)) {
    //     this.editForm.controls[key].enable();
    //   }
    // }
    // 为空是默认使能所有组件
    if (!enableControlArray || enableControlArray === []) {
      for (const key in this.editForm.controls) {
        if (this.editForm.controls.hasOwnProperty(key)) {
          this.editForm.controls[key].enable();
        }
      }
    } else {
      for (const key in this.editForm.controls) {
        if (this.editForm.controls.hasOwnProperty(key)) {
          if (!enableControlArray.includes(key) && key !== 'cronType') {
            this.editForm.controls[key].disable();
          } else {
            this.editForm.controls[key].enable();
          }
        }
      }
    }
    // enableControlArray = enableControlArray ||
    //   ['incrementStart', 'incrementInterval', 'rangeStart', 'rangeEnd', 'spcifyArray', 'dayOfMonth', 'endOfMonth'];
    // enableControlArray.forEach(ele => {
    //   if (this.editForm.contains(ele)) {
    //     this.editForm.controls[ele].disable();
    //   }
    // });
  }


  private initMaxData(type: CronPositionDto) {
    this.dataset = [];
    switch (type) {
      case 'second':
      case 'minute':
        for (let index = 0; index < this.nzMax; index++) {
          this.dataset.push(index);
        }
        break;
      case 'hour':
      case 'day':
      case 'month':
        for (let index = 1; index <= this.nzMax; index++) {
          this.dataset.push(index);
        }
        break;
      case 'year':
        const currentYear = new Date(Date.now()).getFullYear();
        for (let index = 0; index <= 20; index++) {
          this.dataset.push(currentYear + index);
        }
        break;
      default:
        break;
    }
  }
  /** 解析值 */
  private analysisCronData(value: string) {
    let tempArray: string[] = [];
    switch (true) {
      case value === '*':
        this.setEditFormCronType(CronTypeEnum.every);
        break;
      case value.includes('L'):
        this.setEditFormCronType(CronTypeEnum.lastDay);
        tempArray = value.split('');
        this.setEditFormControl('lastWeekday', Number.parseInt(tempArray[0] || '0', 10));
        break;
      case value.includes('#'):
        this.setEditFormCronType(CronTypeEnum.lastWorkday);
        tempArray = value.split('#');
        this.setEditFormControl('weekDay', Number.parseInt(tempArray[0] || '0', 10));
        this.setEditFormControl('weekIndex', tempArray[1]);
        break;
      // case value.includes('W'):
      //   this.setEditFormCronType(CronTypeEnum.lastWorkday);
      //   tempArray = value.split('');
      //   this.setEditFormControl('dayOfMonth', tempArray[0]);
      //   break;
      // case value.includes('/'):
      //   this.setEditFormCronType(CronTypeEnum.interval);
      //   tempArray = value.split('/');
      //   if (tempArray && tempArray.length !== 2) {
      //     console.warn('不合法的表达式');
      //     return;
      //   }
      //   this.setEditFormControl('incrementStart', tempArray[0]);
      //   this.setEditFormControl('incrementInterval', tempArray[1]);
      //   break;
      case value.includes(','):
        this.setEditFormCronType(CronTypeEnum.spcifyArray);
        tempArray = value.split(',');
        if (tempArray && !tempArray.length) {
          console.warn('不合法的表达式');
          return;
        }
        const numberArray = [];
        tempArray.forEach(ele => {
          numberArray.push(Number.parseInt(ele, 10));
        });
        this.setEditFormControl('spcifyArray', numberArray);
        break;
      case value.includes('-'):
        this.setEditFormCronType(CronTypeEnum.range);
        tempArray = value.split('-');
        if (tempArray && tempArray.length !== 2) {
          console.warn('不合法的表达式');
          return;
        }
        this.setEditFormControl('rangeStart', tempArray[0]);
        this.setEditFormControl('rangeEnd', tempArray[1]);
        break;
      default:
        this.setEditFormCronType(CronTypeEnum.every);
        break;
    }
    this.refreshEditFormStatus();
  }

  private setEditFormCronType(value: CronTypeEnum) {
    this.cronType = value;
    this.editForm.get('cronType').patchValue(this.cronType);
  }

  private setEditFormControl(controlName: string, value: string | number | number[]) {
    if (this.editForm.contains(controlName)) {
      this.editForm.get(controlName).setValue(value);
    }
  }

}
