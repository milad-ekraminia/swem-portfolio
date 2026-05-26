import { SvgProps } from '@/types/icons';

export const DotSvg = ({
  width = '8',
  height = '8',
  fill = 'none',
  stroke = '#F04438',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 8 8"
      fill={fill}
    >
      <circle cx="4" cy="4" r="3" fill={stroke} />
    </svg>
  );
};
