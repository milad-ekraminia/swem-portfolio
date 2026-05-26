import { SvgProps } from '@/types/icons';

export const WeatherInfoSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#1570EF',
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.98531 11.989C7.41448 11.989 7.81865 12.0773 8.17198 12.2548C8.43698 10.5082 9.95281 9.1665 11.7703 9.1665C13.7528 9.1665 15.3686 10.7615 15.4195 12.7357C16.6061 12.8873 17.5278 13.8998 17.5278 15.1532C17.5278 16.4948 16.442 17.5832 15.1036 17.5832H6.98531C5.44531 17.5832 4.19531 16.3298 4.19531 14.7865C4.19531 13.2415 5.44531 11.989 6.98531 11.989Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.13346 2.33325V1.66659"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3826 4.09167L13.8492 3.61667"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.46615 8.33317H3.13281"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.42357 3.61667L4.89023 4.09167"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4936 5.97667C10.8902 5.37333 10.0569 5 9.13607 5C7.29523 5 5.80273 6.4925 5.80273 8.33333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
