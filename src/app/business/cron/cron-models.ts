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
  /** 没有间隔 */
  public cronEvery: string;
  public incrementStart: number;
  public incrementInterval: number;
  public rangeStart: number;
  public rangeEnd: number;
  public specifiedArray: string;
  constructor() { }
}

export type CronTypeDto = 'every' | 'interval' | 'range' | 'spcifyArray';
