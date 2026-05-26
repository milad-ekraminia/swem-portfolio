import { SvgProps } from '@/types/icons';

export const NightSvg = ({
  width = '20',
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
      <g clipPath="url(#clip0_2811_54735)">
        <path
          d="M18.3334 13.2035C17.2389 13.6985 16.024 13.974 14.7446 13.974C9.92949 13.974 6.02604 10.0706 6.02604 5.25544C6.02604 3.97612 6.30159 2.76115 6.79656 1.66666C3.77155 3.03468 1.66675 6.07891 1.66675 9.61473C1.66675 14.4299 5.5702 18.3333 10.3853 18.3333C13.9212 18.3333 16.9654 16.2285 18.3334 13.2035Z"
          stroke="#98A2B3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2811_54735">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
