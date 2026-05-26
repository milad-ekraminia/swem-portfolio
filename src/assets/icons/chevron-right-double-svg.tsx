import { SvgProps } from '@/types/icons';

export const ChevronRighDoubletSvg = ({
  width = '25',
  height = '24',
  fill = 'none',
  stroke = '#475467',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill={fill}
    >
      <path
        d="M6.5 17L11.5 12L6.5 7M13.5 17L18.5 12L13.5 7"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
