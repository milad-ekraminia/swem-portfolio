import { SvgProps } from '@/types/icons';

const CircledArrowTopSvg = ({
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
      <g clipPath="url(#clip0_3911_43882)">
        <path
          d="M13.3327 10L9.99935 6.66667M9.99935 6.66667L6.66602 10M9.99935 6.66667V13.3333M18.3327 10C18.3327 14.6024 14.6017 18.3333 9.99935 18.3333C5.39698 18.3333 1.66602 14.6024 1.66602 10C1.66602 5.39763 5.39698 1.66667 9.99935 1.66667C14.6017 1.66667 18.3327 5.39763 18.3327 10Z"
          stroke="#344054"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3911_43882">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CircledArrowTopSvg;
