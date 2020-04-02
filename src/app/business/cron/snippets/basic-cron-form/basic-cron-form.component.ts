import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CronDataItemDto, CronTypeDto, CronTypeEnum, CronPositionDto, CommonValueDto, CRON_TYPE_MAPPED } from '../../cron-models';

@Component({
  selector: 'app-basic-cron-form',
  templateUrl: './basic-cron-form.component.html',
  styleUrls: ['./basic-cron-form.component.less']
})
export class BasicCronFormComponent implements OnInit, OnChanges {

  @Input() nzData: string;
  @Input() nzCronPosition: CronPositionDto;  // 'second'|'minute'等等
  @Output() nzCronValueChange = new EventEmitter<CommonValueDto>();

  nzMax: number;
  nzMin: number;
  /** 可选择的数据 */
  dataset: number[] = [];
  /** 根据类型显示的中文名称 */
  nzCronTypeCN: string;

  cronType: CronTypeDto;

  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  editForm: FormGroup;
  editDto: CronDataItemDto;

  currentYear = new Date(Date.now()).getFullYear();

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initData();
    this.refreshEditFormStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    // console.log(changes);
    setTimeout(() => {
      for (const key in changes) {
        if (key === 'nzData' && changes[key].currentValue) {
          const currentValue = changes[key].currentValue;
          this.analysisCronData(this.nzData);
        }
      }
    });
  }

  private initData() {
    this.nzData = this.nzData || '*';
    this.nzCronPosition = this.nzCronPosition || 'second';
    const tempMax = CRON_TYPE_MAPPED[this.nzCronPosition].max;
    const tempMin = CRON_TYPE_MAPPED[this.nzCronPosition].min;
    this.nzMax = tempMax || 12;
    this.nzMin = tempMin || 1;
    this.nzCronTypeCN = CRON_TYPE_MAPPED[this.nzCronPosition].cnType;

    this.createCronDataItemDto();

    this.initMaxData(this.nzCronPosition);
    this.analysisCronData(this.nzData);
  }

  createCronDataItemDto(dto?: CronDataItemDto) {
    if (this.nzCronPosition === 'year') {
      this.editForm = this.fb.group({
        cronType: ['every'],
        cronEvery: [null],
        incrementStart: [this.currentYear],
        incrementInterval: [1],
        rangeStart: [this.currentYear],
        rangeEnd: [this.currentYear + 1],
        spcifyArray: [[]],
      });
    } else {
      this.editForm = this.fb.group({
        cronType: ['every'],
        cronEvery: [null],
        incrementStart: [1],
        incrementInterval: [2],
        rangeStart: [1],
        rangeEnd: [7],
        spcifyArray: [[]],
      });
    }

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
      case CronTypeEnum.interval:
        const incrementStart = this.editForm.get('incrementStart').value || 1;
        const incrementInterval = this.editForm.get('incrementInterval').value || 2;
        this.nzData = `${incrementStart}/${incrementInterval}`;
        break;
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
        this.disabledEditForm();
        break;
      case 'interval':
        this.disabledEditForm(['rangeStart', 'rangeEnd', 'spcifyArray']);
        break;
      case 'range':
        this.disabledEditForm(['incrementStart', 'incrementInterval', 'spcifyArray']);
        break;
      case 'spcifyArray':
        this.disabledEditForm(['incrementStart', 'incrementInterval', 'rangeStart', 'rangeEnd']);
        break;
      default:
        break;
    }
  }

  disabledEditForm(controlArray?: string[]) {
    for (const key in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(key)) {
        this.editForm.controls[key].enable();
      }
    }
    controlArray = controlArray || ['incrementStart', 'incrementInterval', 'rangeStart', 'rangeEnd', 'spcifyArray'];
    controlArray.forEach(ele => {
      if (this.editForm.contains(ele)) {
        this.editForm.controls[ele].disable();
      }
    });
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

  private analysisCronData(value: string) {
    let tempArray: string[] = [];
    switch (true) {
      case value === '*':
        this.setEditFormCronType(CronTypeEnum.every);
        break;
      case value.includes('/'):
        this.setEditFormCronType(CronTypeEnum.interval);
        tempArray = value.split('/');
        if (tempArray && tempArray.length !== 2) {
          console.warn('不合法的表达式');
          return;
        }
        this.setEditFormControl('incrementStart', tempArray[0]);
        this.setEditFormControl('incrementInterval', tempArray[1]);
        break;
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

  private setEditFormControl(controlName: string, value: string | number[]) {
    if (this.editForm.contains(controlName)) {
      this.editForm.get(controlName).setValue(value);
    }
  }


}
