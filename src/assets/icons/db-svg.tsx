import { SvgProps } from '@/types/icons';

export const DbSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#344054',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 14H6C4.343 14 3 15.343 3 17V17C3 18.657 4.343 20 6 20H18C19.657 20 21 18.657 21 17V17C21 15.343 19.657 14 18 14Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17H11"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.03536 16.9646C6.05488 16.9842 6.05488 17.0158 6.03536 17.0354C6.01583 17.0549 5.98417 17.0549 5.96464 17.0354C5.94512 17.0158 5.94512 16.9842 5.96464 16.9646C5.98417 16.9451 6.01583 16.9451 6.03536 16.9646"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9898 16.757L20.1428 5.845C20.0618 4.804 19.1938 4 18.1488 4H5.85077C4.80577 4 3.93777 4.804 3.85677 5.845L3.00977 16.757"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
