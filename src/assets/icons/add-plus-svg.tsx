import { SvgProps } from '@/types/icons';

export const AddPlusSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = 'white',
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
        d="M9.99996 4.16699V15.8337M4.16663 10.0003H15.8333"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
