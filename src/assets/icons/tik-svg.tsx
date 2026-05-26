import { SvgProps } from '@/types/icons';

export const TikSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = 'white',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill={fill}
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke={stroke}
        strokeWidth="1.6666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
