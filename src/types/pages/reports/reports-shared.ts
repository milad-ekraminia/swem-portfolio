export type ChartFieldMapping = {
  xField: string; // X-axis value (can be dateText, formatted date, etc.)
  yField: string; // Y-axis value
  groupBy: string; // Series grouping field
  dateField?: string; // Used for sorting and formatting if needed
  dateFormatter?: (date: string) => string | number; // Optional custom formatter
};
