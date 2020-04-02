export class CronDataDto {
  constructor(
    public second: CronDataItemDto,
    public minute: CronDataItemDto,
    public hour: CronDataItemDto,
    public day: CronDataItemDto,
    public month: CronDataItemDto,
    public week: CronDataItemDto,
    public year: CronDataItemDto
  ) { }
}

export class CronDataItemDto {

  constructor(
    public cronEvery?: string,
    public incrementStart?: number,
    public incrementInterval?: number,
    public rangeStart?: number,
    public rangeEnd?: number,
    public specifiedArray?: string,
    /** 对应的中文名称 */
    public cnType?: string,
    /** 最大值 */
    public max?: number,
    /** 没有间隔 */
    public min?: number
  ) { }
}

export type CronTypeDto = 'every' | 'interval' | 'range' | 'spcifyArray' | 'lastDay' | 'lastWorkday';

export type CronPositionDto = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'week' | 'year';

export enum CronTypeEnum {
  every = 'every',
  interval = 'interval',
  range = 'range',
  spcifyArray = 'spcifyArray',
  lastDay = 'lastDay',
  lastWorkday = 'lastWorkday'
}

export class CommonValueDto {
  constructor(
    public type: CronPositionDto,
    public value: string
  ) { }
}

export const CRON_TYPE_MAPPED: CronDataDto = {
  second: {
    cnType: '秒',
    max: 60
  },
  minute: {
    cnType: '分钟',
    max: 60
  },
  hour: {
    cnType: '小时',
    max: 24
  },
  day: {
    cnType: '天',
    max: 31
  },
  month: {
    cnType: '月',
    max: 12
  },
  week: {
    cnType: '周',
    max: 12
  },
  year: {
    cnType: '年',
    min: new Date(Date.now()).getFullYear(),
    max: new Date(Date.now()).getFullYear() + 30
  }
};

export const WEEK_INFO_DATASET = [
  { name: '星期一', value: 1 },
  { name: '星期二', value: 2 },
  { name: '星期三', value: 3 },
  { name: '星期四', value: 4 },
  { name: '星期五', value: 5 },
  { name: '星期六', value: 6 },
  { name: '星期日', value: 0 },
];
