import { SvgProps } from '@/types/icons';

export const SotwareVersionsSvg = ({
  width = '18',
  height = '17',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 17"
      fill={fill}
    >
      <path
        d="M9.83331 8.50001H12.3333"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66669 6.83334L7.33335 8.50001L5.66669 10.1667"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.5"
        y="1"
        width="15"
        height="15"
        rx="5"
        stroke="#323232"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
