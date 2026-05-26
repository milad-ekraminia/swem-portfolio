import { SvgProps } from '@/types/icons';

export const TableAlertSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="info-circle" clipPath="url(#clip0_2839_33643)">
        <path
          id="Icon"
          d="M10.0003 13.3333V10M10.0003 6.66667H10.0087M18.3337 10C18.3337 14.6024 14.6027 18.3333 10.0003 18.3333C5.39795 18.3333 1.66699 14.6024 1.66699 10C1.66699 5.39763 5.39795 1.66667 10.0003 1.66667C14.6027 1.66667 18.3337 5.39763 18.3337 10Z"
          stroke="var(--brand-600)"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2839_33643">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
