import { SvgProps } from '@/types/icons';

export const ChevronLeftSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#344054',
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
        d="M11.6667 6.66663L8.33337 9.99996L11.6667 13.3333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
