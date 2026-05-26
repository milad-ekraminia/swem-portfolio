import { SvgProps } from '@/types/icons';

export const ConsumingSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#1570EF',
}: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill={fill}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.83398 17.5H14.1673C15.548 17.5 16.6673 16.3807 16.6673 15V6.97639C16.6673 6.31335 16.4039 5.67747 15.9351 5.20862L13.9587 3.23223C13.4899 2.76339 12.854 2.5 12.1909 2.5H5.83398C4.45327 2.5 3.33398 3.61929 3.33398 5V15C3.33398 16.3807 4.45327 17.5 5.83398 17.5Z" stroke="#1570EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.3327 14.1667H6.66602" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.3327 11.2499H6.66602" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.16602 8.33341H6.66602" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.6673 7.08333H13.7507C12.8302 7.08333 12.084 6.33714 12.084 5.41667V2.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
