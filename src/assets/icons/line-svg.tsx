import { SvgProps } from '@/types/icons';

export const LineSvg = ({
  width = '2',
  height = '10',
  fill = 'none',
  stroke = '#E4E7EC',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 2 10"
      fill={fill}
    >
      <path d="M1.25 1V9" stroke={stroke} strokeLinecap="round" />
    </svg>
  );
};
