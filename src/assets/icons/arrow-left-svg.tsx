import { SvgProps } from '@/types/icons';

export const ArrowLeftSvg = ({
  width = '21.82',
  height = '20',
  fill = 'none',
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
        d="M15.8337 10.0003H4.16699M4.16699 10.0003L10.0003 15.8337M4.16699 10.0003L10.0003 4.16699"
        stroke="#344054"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
