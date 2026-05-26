import { SvgProps } from '@/types/icons';

export const WeatherSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = "#344054"
}: SvgProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.58942 9.59125C5.93276 9.59125 6.25609 9.66192 6.53876 9.80392C6.75076 8.40659 7.96342 7.33325 9.41742 7.33325C11.0034 7.33325 12.2961 8.60925 12.3368 10.1886C13.2861 10.3099 14.0234 11.1199 14.0234 12.1226C14.0234 13.1959 13.1548 14.0666 12.0841 14.0666H5.58942C4.35742 14.0666 3.35742 13.0639 3.35742 11.8293C3.35742 10.5933 4.35742 9.59125 5.58942 9.59125Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.30599 1.8666V1.33327" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.7053 3.27333L11.0786 2.89333" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.97292 6.66659H2.50625" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.53924 2.89333L3.91258 3.27333" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.19524 4.78133C8.71258 4.29867 8.04591 4 7.30924 4C5.83658 4 4.64258 5.194 4.64258 6.66667" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
