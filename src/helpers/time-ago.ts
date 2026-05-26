import { getTranslatedValue } from '@/helpers/get-translated-value';


export type TimeAgoOptions = {
  immediate?: boolean;
  maxUnit?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
};

function pluralize(n: number, word?: string) {
  return `${n} ${word ?? ''}`;
}

export function timeAgoFrom(
  input: Date | string | number,
  opts: TimeAgoOptions = {},
): string {
  const { immediate = true, maxUnit = 'year' } = opts;

  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const isFuture = diffMs < 0;
  const diff = Math.abs(diffMs);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const dirPast = (s: string) => (isFuture ? `in ${s}` : `${s}`);

  if (seconds < 10 && immediate)
    return isFuture ? 'in seconds' : getTranslatedValue('Now');

  if (maxUnit === 'second' || seconds < 60) {
    if (seconds < 60)
      return dirPast(
        pluralize(
          seconds || 1,
          getTranslatedValue('Second') + ' ' + getTranslatedValue('Ago'),
        ),
      );
  }

  if (maxUnit === 'minute' || minutes < 60) {
    if (minutes < 60)
      return dirPast(
        pluralize(
          minutes || 1,
          getTranslatedValue('Minute') + ' ' + getTranslatedValue('Ago'),
        ),
      );
  }

  if (maxUnit === 'hour' || hours < 24) {
    if (hours < 24)
      return dirPast(
        pluralize(
          hours || 1,
          getTranslatedValue('Hour') + ' ' + getTranslatedValue('Ago'),
        ),
      );
  }

  if (maxUnit === 'day' || days < 30) {
    if (days < 7)
      return dirPast(
        pluralize(
          days || 1,
          getTranslatedValue('Day') + ' ' + getTranslatedValue('Ago'),
        ),
      );
    if (weeks < 5)
      return dirPast(
        pluralize(
          weeks || 1,
          getTranslatedValue('Week') + ' ' + getTranslatedValue('Ago'),
        ),
      );
  }

  if (maxUnit === 'month' || months < 12) {
    if (months < 12)
      return dirPast(
        pluralize(
          months || 1,
          getTranslatedValue('Month') + ' ' + getTranslatedValue('Ago'),
        ),
      );
  }

  return dirPast(
    pluralize(
      years || 1,
      getTranslatedValue('Year') + ' ' + getTranslatedValue('Ago'),
    ),
  );
}