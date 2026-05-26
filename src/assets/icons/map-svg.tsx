import { SvgProps } from '@/types/icons';

export const MapSvg = ({
  width = '24',
  height = '21',
  fill = 'none',
  stroke = '#98A2B3',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill={fill}
    >
      <path
        d="M10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.51367 12.9999H3.99979C5.10436 12.9999 5.99979 12.1045 5.99979 10.9999V8.99993C5.99979 7.89536 6.89522 6.99993 7.99979 6.99993H9.99979C11.1044 6.99993 11.9998 6.1045 11.9998 4.99993V1.22461"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.499 15.25C15.3611 15.2506 15.2496 15.3627 15.25 15.5007C15.2504 15.6386 15.3624 15.7502 15.5003 15.75C15.6383 15.7498 15.75 15.6379 15.75 15.5C15.7504 15.4334 15.724 15.3695 15.6768 15.3225C15.6296 15.2755 15.5656 15.2494 15.499 15.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 15.5V15.5C12 13.567 13.567 12 15.5 12V12C17.433 12 19 13.567 19 15.5V15.5C19 17.1385 17.212 18.8888 16.192 19.7544C15.7892 20.0819 15.2118 20.0819 14.809 19.7544C13.788 18.8888 12 17.1385 12 15.5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
