import { SvgProps } from '@/types/icons';

export const ChevronDownSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#667085',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
