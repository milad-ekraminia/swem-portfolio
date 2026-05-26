import { SvgProps } from '@/types/icons';

export const ArrowRightSvg = ({
  width = '21.82',
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
        d="M4.16699 10.0003H15.8337M15.8337 10.0003L10.0003 4.16699M15.8337 10.0003L10.0003 15.8337"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
