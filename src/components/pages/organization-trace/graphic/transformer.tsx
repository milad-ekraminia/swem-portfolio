type Item = {
  fieldName: string;
  fieldType: number;
  fieldValue: string;
  filterProfileId: number;
};

type ChartPoint = {
  date: string;
  value: number;
  device: string;
  color: string;
  serial: string;
  yAxix: number;
  description: string;
};

export function transformItemsToChartPoints(items: any[]): ChartPoint[] {
  const points: ChartPoint[] = [];

  // Group items by prefix (e.g., md|0, ci|0, da|0, wi|0)
  const grouped: Record<string, Item[]> = {};
  items.forEach((item) => {
    const parts = item.fieldName.split('|');
    if (parts.length === 1) return; // skip general fields
    const prefix = parts.slice(0, 2).join('|');
    if (!grouped[prefix]) grouped[prefix] = [];
    grouped[prefix].push(item);
  });

  // Map prefixes to device names and serial types
  const prefixMap: Record<string, { device: string; serial: string }> = {
    'md|0': { device: 'Measurement-1', serial: 'line' },
    'ci|0': { device: 'Measurement-2', serial: 'line' },
    'da|0': { device: 'x', serial: 'dot' },
    'wi|0': { device: 'wheatherData', serial: 'bar' },
  };

  Object.keys(grouped).forEach((prefix) => {
    const meta: Record<string, string> = {};
    grouped[prefix].forEach((item) => {
      const key = item.fieldName.split('|').pop()!;
      meta[key] = item.fieldValue;
    });

    // Example: generate 5 points per series using StartDateTime + 5 min increments
    const startDateItem = items.find((i) => i.fieldName === 'StartDateTime');
    const startDate = startDateItem
      ? new Date(startDateItem.fieldValue)
      : new Date();

    for (let i = 0; i < 5; i++) {
      points.push({
        date: new Date(startDate.getTime() + i * 5 * 60 * 1000).toISOString(),
        value: Number(meta['Value'] || i * 10 + 10), // use Value if exists, else dummy
        device: prefixMap[prefix]?.device || prefix,
        color: meta['Color'] || '#000000',
        serial: prefixMap[prefix]?.serial || 'line',
        yAxix: Number(meta['YAxis'] || 1),
        description: meta['Description'] || '',
      });
    }
  });

  return points;
}

type InputItem = {
  fieldName: string;
  fieldType: number;
  fieldValue: string;
  filterProfileId: number;
};

type Input = {
  items: InputItem[];
};

export function transformData(data: Input) {
  const result: any = {};

  data.items.forEach(({ fieldName, fieldValue }) => {
    // Split by "|"
    const parts = fieldName.split('|');

    if (parts.length === 1) {
      // Top-level fields (like Period, StartDateTime, EndDateTime)
      result[parts[0]] = isNaN(Number(fieldValue))
        ? fieldValue
        : Number(fieldValue);
    } else {
      const [group, index, key] = parts;
      if (!result[group]) result[group] = [];
      if (!result[group][Number(index)]) result[group][Number(index)] = {};

      // Assign value (auto convert number if possible)
      result[group][Number(index)][key] = isNaN(Number(fieldValue))
        ? fieldValue
        : Number(fieldValue);
    }
  });

  // Clean up empty slots in arrays
  Object.keys(result).forEach((k) => {
    if (Array.isArray(result[k])) {
      result[k] = result[k].filter(Boolean);
    }
  });
  const updated = {
    ...result,
    measurementDataFields: result?.md,
    consInformationFields: result?.ci,
    deviceArchiveFields: result?.da,
    weatherInfoFields: result?.wi,
  };
  return updated;
}
