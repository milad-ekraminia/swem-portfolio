import { getTranslatedValue } from './get-translated-value';

export function generateTimeOptions() {
  const options: { value: number; title: string }[] = [];

  for (let minutes = 15; minutes <= 1425; minutes += 15) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    const titleParts: string[] = [
      ...(hour > 0 ? [`${hour} ${getTranslatedValue('Hour')}`] : []),
      ...(minute > 0 ? [`${minute} ${getTranslatedValue('Minute')}`] : []),
    ];

    options.push({
      value: minutes,
      title: titleParts.join(' : '),
    });
  }

  return options;
}
