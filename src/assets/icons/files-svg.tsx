import { SvgProps } from '@/types/icons';

export const FilesSvg = ({
  width = '24',
  height = '20',
  fill = 'none',
  stroke = '#98A2B3',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 19H14C15.6569 19 17 17.6569 17 16V6.37167C17 5.57602 16.6839 4.81296 16.1213 4.25035L13.7497 1.87868C13.187 1.31607 12.424 1 11.6283 1H4C2.34315 1 1 2.34315 1 4V16C1 17.6569 2.34315 19 4 19Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 15H5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 11.5H5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8H5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 6.5H13.5C12.3954 6.5 11.5 5.60457 11.5 4.5V1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
