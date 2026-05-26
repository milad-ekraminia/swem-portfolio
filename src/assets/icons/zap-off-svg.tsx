import { SvgProps } from '@/types/icons';

export const ZapOffSvg = ({
  width = '10',
  height = '10',
  stroke = '#F79009',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
    >
      <g clipPath="url(#clip0_4839_72025)">
        <path
          d="M3.33333 3.33398L1.70561 5.28726C1.56027 5.46166 1.4876 5.54886 1.48649 5.62251C1.48553 5.68653 1.51405 5.74744 1.56386 5.78769C1.62114 5.83398 1.73466 5.83398 1.96168 5.83398H5L4.58333 9.16732L6.66667 6.66732M6.52085 4.16732H8.03832C8.26534 4.16732 8.37886 4.16732 8.43614 4.21361C8.48595 4.25386 8.51447 4.31477 8.51351 4.37879C8.5124 4.45244 8.43973 4.53964 8.29439 4.71405L7.72927 5.3922M4.40531 2.04759L5.41665 0.833984L5.16677 2.83303M8.75 8.75065L1.25 1.25065"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={'1.2'}
        />
      </g>
      <defs>
        <clipPath id="clip0_4839_72025">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
