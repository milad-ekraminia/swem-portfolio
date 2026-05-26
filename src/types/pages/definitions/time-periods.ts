export interface TimePeriod {
  id: number;
  active: boolean;
  timePeriodName: string;
  timePeriodType: number;
  timePeriodDescription: string;
  timePeriodDetails: TimePeriodDetail[];
}
export interface TimePeriodFormData extends TimePeriod {
  timePeriodDetails: TimePeriodDetail[];
}
export interface TimePeriodDetail {
  id?: number;
  startDateYear?: number;
  startDateMonth?: number;
  startDateDay?: number;
  startDateHour?: number;
  startDateMinute?: number;
  endDateYear?: number;
  endDateMonth?: number;
  endDateDay?: number;
  endDateHour?: number;
  endDateMinute?: number;
  dayOfWeek?: number;
}
