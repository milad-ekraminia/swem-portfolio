import { SvgProps } from '@/types/icons';

export const LightSvg = ({
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
      <g clipPath="url(#clip0_2597_81061)">
        <path
          d="M10.0001 1.66666V3.33332M10.0001 16.6667V18.3333M3.33341 9.99999H1.66675M5.26184 5.26175L4.08333 4.08324M14.7383 5.26175L15.9168 4.08324M5.26184 14.7417L4.08333 15.9202M14.7383 14.7417L15.9168 15.9202M18.3334 9.99999H16.6667M14.1667 9.99999C14.1667 12.3012 12.3013 14.1667 10.0001 14.1667C7.6989 14.1667 5.83341 12.3012 5.83341 9.99999C5.83341 7.6988 7.6989 5.83332 10.0001 5.83332C12.3013 5.83332 14.1667 7.6988 14.1667 9.99999Z"
          stroke="#FEC84B"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2597_81061">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
