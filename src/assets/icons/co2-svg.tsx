import { SvgProps } from '@/types/icons';

export const Co2Svg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#667085',
}: SvgProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2319 13.5003H11.4686C11.1986 13.5003 10.9396 13.393 10.7488 13.202C10.558 13.011 10.4509 12.7519 10.4512 12.4819V9.93786C10.4509 9.66785 10.558 9.4088 10.7488 9.21778C10.9396 9.02676 11.1986 8.91943 11.4686 8.91943H12.2319C12.7944 8.91943 13.2503 9.3754 13.2503 9.93786V12.4819C13.2503 12.752 13.143 13.0111 12.952 13.2021C12.7611 13.393 12.502 13.5003 12.2319 13.5003Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.4512 12.4723C15.4512 11.7679 16.0222 11.1968 16.7267 11.1968C17.4312 11.1968 18.0022 11.7679 18.0022 12.4723C18.0022 14.066 15.4532 14.066 15.4532 15.9528H18.0022" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2.99609" y="3.49658" width="18.0075" height="18.0075" rx="5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.28605 8.91943H7.01452C6.45206 8.91943 5.99609 9.3754 5.99609 9.93786V12.4819C5.99609 13.0444 6.45206 13.5003 7.01452 13.5003H8.28605" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
