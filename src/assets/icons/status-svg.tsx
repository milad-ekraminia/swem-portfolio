import { SvgProps } from '@/types/icons';

export const StatusSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = "#344054"
}: SvgProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M13.1934 4.99878C13.723 5.9103 14.0019 6.9458 14.0017 8.00003" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.9976 13.1944C4.08777 12.6673 3.33174 11.9113 2.80469 11.0015" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.0013 2.8059C10.0897 2.27623 9.05423 1.99734 8 1.99756" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14.0027C10.1423 13.9986 12.1208 12.8555 13.1942 11.0015" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.99734 2.80591C3.14335 3.87931 2.00018 5.85777 1.99609 8.00007" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.99879" cy="8.00001" r="3.33472" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
