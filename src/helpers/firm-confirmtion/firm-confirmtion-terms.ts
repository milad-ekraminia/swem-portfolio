import { getTranslatedValue } from '../get-translated-value';

export const monthOptions = Array.from({ length: 31 }, (_, i) => ({
  title: `${i + 1}`,
  value: i + 1,
}));

export const hourOptions = Array.from({ length: 25 }, (_, i) => ({
  title: `${i}`,
  value: i,
}));

export const weekOptions = [
  {
    title: getTranslatedValue('Enum:DayOfWeek.Sunday'),
    value: 0,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Monday'),
    value: 1,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Tuesday'),
    value: 2,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Wednesday'),
    value: 3,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Thursday'),
    value: 4,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Friday'),
    value: 5,
  },
  {
    title: getTranslatedValue('Enum:DayOfWeek.Saturday'),
    value: 6,
  },
];

export const electricFormList = (errors: any) => [
  {
    id: 1,
    name: 'monthly_term_start_1',
    label: getTranslatedValue('monthly_term_start_1'),
    placeholder: getTranslatedValue('monthly_term_start_1'),
    options: monthOptions,
    error: errors?.monthly_term_start_1?.message,
  },
  {
    id: 2,
    name: 'weekly_term_start_1',
    label: getTranslatedValue('weekly_term_start_1'),
    placeholder: getTranslatedValue('weekly_term_start_1'),
    options: weekOptions,
    error: errors?.assignedUserId?.message,
  },
  {
    id: 3,
    name: 'daily_term_start_1',
    label: getTranslatedValue('daily_term_start_1'),
    placeholder: getTranslatedValue('daily_term_start_1'),
    options: hourOptions,
    error: errors?.assignedUserId?.message,
  },
];

export const naturalGasFormList = (errors: any) => [
  {
    id: 1,
    name: 'monthly_term_start_2',
    label: getTranslatedValue('monthly_term_start_2'),
    placeholder: getTranslatedValue('monthly_term_start_2'),
    options: monthOptions,
    error: errors?.monthly_term_start_1?.message,
  },
  {
    id: 2,
    name: 'weekly_term_start_2',
    label: getTranslatedValue('weekly_term_start_2'),
    placeholder: getTranslatedValue('weekly_term_start_2'),
    options: weekOptions,
    error: errors?.assignedUserId?.message,
  },
  {
    id: 3,
    name: 'daily_term_start_2',
    label: getTranslatedValue('daily_term_start_2'),
    placeholder: getTranslatedValue('daily_term_start_2'),
    options: hourOptions,
    error: errors?.assignedUserId?.message,
  },
];

export const waterFormList = (errors: any) => [
  {
    id: 1,
    name: 'monthly_term_start_3',
    label: getTranslatedValue('monthly_term_start_3'),
    placeholder: getTranslatedValue('monthly_term_start_3'),
    options: monthOptions,
    error: errors?.monthly_term_start_3?.message,
  },
  {
    id: 2,
    name: 'weekly_term_start_3',
    label: getTranslatedValue('weekly_term_start_3'),
    placeholder: getTranslatedValue('weekly_term_start_3'),
    options: weekOptions,
    error: errors?.weekly_term_start_3?.message,
  },
  {
    id: 3,
    name: 'daily_term_start_3',
    label: getTranslatedValue('daily_term_start_3'),
    placeholder: getTranslatedValue('daily_term_start_3'),
    options: hourOptions,
    error: errors?.daily_term_start_3?.message,
  },
];

export const heatFormList = (errors: any) => [
  {
    id: 1,
    name: 'monthly_term_start_4',
    label: getTranslatedValue('monthly_term_start_4'),
    placeholder: getTranslatedValue('monthly_term_start_4'),
    options: monthOptions,
    error: errors?.monthly_term_start_4?.message,
  },
  {
    id: 2,
    name: 'weekly_term_start_4',
    label: getTranslatedValue('weekly_term_start_4'),
    placeholder: getTranslatedValue('weekly_term_start_4'),
    options: weekOptions,
    error: errors?.weekly_term_start_4?.message,
  },
  {
    id: 3,
    name: 'daily_term_start_4',
    label: getTranslatedValue('daily_term_start_4'),
    placeholder: getTranslatedValue('daily_term_start_4'),
    options: hourOptions,
    error: errors?.daily_term_start_4?.message,
  },
];

export const energyFormList = (errors: any) => [
  {
    id: 1,
    name: 'monthly_term_start_5',
    label: getTranslatedValue('monthly_term_start_5'),
    placeholder: getTranslatedValue('monthly_term_start_5'),
    options: monthOptions,
    error: errors?.monthly_term_start_5?.message,
  },
  {
    id: 2,
    name: 'weekly_term_start_5',
    label: getTranslatedValue('weekly_term_start_5'),
    placeholder: getTranslatedValue('weekly_term_start_5'),
    options: weekOptions,
    error: errors?.weekly_term_start_5?.message,
  },
  {
    id: 3,
    name: 'daily_term_start_5',
    label: getTranslatedValue('daily_term_start_5'),
    placeholder: getTranslatedValue('daily_term_start_5'),
    options: hourOptions,
    error: errors?.daily_term_start_5?.message,
  },
];
