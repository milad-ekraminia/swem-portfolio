import { SvgProps } from '@/types/icons';

export const ArrowDownSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#F04438',
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
        d="M10 4.1665V15.8332M10 15.8332L15.8334 9.99984M10 15.8332L4.16669 9.99984"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
