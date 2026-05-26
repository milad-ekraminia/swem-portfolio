import { SvgProps } from '@/types/icons';

export const MinusSvg = ({
  width = '14',
  height = '14',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill={fill}
    >
      <path
        d="M2.91699 7H11.0837"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
