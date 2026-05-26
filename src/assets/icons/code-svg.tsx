import { SvgProps } from '@/types/icons';

export const CodeSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#98A2B3',
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
        d="M11 10H14"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8L8 10L6 12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
