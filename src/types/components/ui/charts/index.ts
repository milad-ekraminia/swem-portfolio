export type CustomLineChartProps = {
  series: {
    name: string;
    data: { x: unknown; y: any }[];
  }[];
  title?: string;
  isLoading: boolean;
  children?: React.ReactNode;
  chartId: string;
  colors: string[];
  downloadHandler?: any;
};
export type LineChartProps = {
  series: {
    name: string;
    data: { x: unknown; y: any }[];
  }[];
  dates: string[];
  title?: string;
  isLoading: boolean;
  children?: React.ReactNode;
  chartId: string;
  xaxisType?: 'datetime' | 'category';
  colors: string[];
  removeXaxisData?: boolean;
  downloadHandler?: any;
  height?: any;
  maxShownItems?: any;
  loading?: boolean;
  showSeriesInOne?: boolean;
  tickAmount?: number;
};
export type HeatmapChartProps = {
  haveDecimalValue?: boolean;
  series: {
    name: string;
    data: { x: unknown; y: any }[];
  }[];
  days: string[];
  title: string;
  isLoading: boolean;
  children?: React.ReactNode;
  xaxisType?: 'datetime' | 'category';
};
export type AnimationConfig = {
  enabled?: boolean;
  easing?: 'linear' | 'easein' | 'easeout' | 'easeinout';
  speed?: number;
  animateGradually?: {
    enabled?: boolean;
    delay?: number;
  };
  dynamicAnimation?: {
    enabled?: boolean;
    speed?: number;
  };
};
