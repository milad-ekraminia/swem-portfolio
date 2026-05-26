import { SvgProps } from '@/types/icons';

export const UserCircleSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#667085',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <g clipPath="url(#clip0_9070_299266)">
        <path
          d="M4.43057 16.1985C4.93751 15.0042 6.12109 14.1665 7.50033 14.1665H12.5003C13.8796 14.1665 15.0631 15.0042 15.5701 16.1985M13.3337 7.9165C13.3337 9.75745 11.8413 11.2498 10.0003 11.2498C8.15938 11.2498 6.66699 9.75745 6.66699 7.9165C6.66699 6.07555 8.15938 4.58317 10.0003 4.58317C11.8413 4.58317 13.3337 6.07555 13.3337 7.9165ZM18.3337 9.99984C18.3337 14.6022 14.6027 18.3332 10.0003 18.3332C5.39795 18.3332 1.66699 14.6022 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665C14.6027 1.6665 18.3337 5.39746 18.3337 9.99984Z"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9070_299266">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
