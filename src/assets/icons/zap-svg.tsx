import { SvgProps } from '@/types/icons';

export const ZapSvg = ({
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
      <g clipPath="url(#clip0_4180_153298)">
        <path
          d="M5.41665 0.833984L1.70559 5.28726C1.56025 5.46166 1.48758 5.54886 1.48647 5.62251C1.48551 5.68653 1.51404 5.74744 1.56384 5.78769C1.62113 5.83398 1.73464 5.83398 1.96166 5.83398H4.99998L4.58332 9.16732L8.29438 4.71405C8.43971 4.53964 8.51238 4.45244 8.51349 4.37879C8.51446 4.31477 8.48593 4.25386 8.43613 4.21361C8.37884 4.16732 8.26533 4.16732 8.0383 4.16732H4.99998L5.41665 0.833984Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={'1.2'}
        />
      </g>
      <defs>
        <clipPath id="clip0_4180_153298">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
