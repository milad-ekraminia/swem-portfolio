import { SvgProps } from '@/types/icons';

export const ArrowUpSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#17B26A',
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
        d="M10 15.8333V4.16667M10 4.16667L4.16667 10M10 4.16667L15.8333 10"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
