import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CronDataItemDto, CronTypeDto } from '../../cron-models';

@Component({
  selector: 'app-basic-cron-form',
  templateUrl: './basic-cron-form.component.html',
  styleUrls: ['./basic-cron-form.component.less']
})
export class BasicCronFormComponent implements OnInit {

  @Input() nzData: string;
  @Input() nzMax: number;

  dataset: number[] = [];

  cronType: CronTypeDto = 'every';

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
    this.nzMax = this.nzMax || 12;
    for (let index = 1; index <= this.nzMax; index++) {
      this.dataset.push(index);
    }
    this.createCronDataItemDto();
  }

  createCronDataItemDto(dto?: CronDataItemDto) {
    this.editForm = this.fb.group({
      cronEvery: [null],
      incrementStart: [1],
      incrementInterval: [2],
      rangeStart: [1],
      rangeEnd: [7],
      specifiedArray: [null],

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

}
