import { SvgProps } from '@/types/icons';

export const EarthLocationSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
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
        d="M15 10C15 10 18.502 7.125 18.502 4.5C18.502 2.567 16.934 1 15 1C13.066 1 11.498 2.567 11.498 4.5C11.498 7.125 15 10 15 10Z"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.001 4.35001C15.139 4.35001 15.251 4.46201 15.25 4.60001C15.25 4.73801 15.138 4.85001 15 4.85001C14.862 4.85001 14.75 4.73801 14.75 4.60001C14.75 4.46201 14.862 4.35001 15.001 4.35001"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.531 4.02499C6.78 4.27099 3 8.18799 3 13C3 17.971 7.029 22 12 22C16.971 22 21 17.971 21 13C21 10.348 19.848 7.97199 18.023 6.32899"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99996 21.068V20.997C7.99996 18.997 12 19.233 12 16.997C12 14.997 8.99996 14.997 8.99996 11.997C8.99996 9.16899 6.99996 8.99699 3.99996 8.99699H3.93896"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9699 19.72C17.8189 19.662 17.6689 19.601 17.5259 19.517C16.0899 18.677 15.6079 16.833 16.4469 15.397C17.2869 13.961 19.1309 13.479 20.5669 14.318C20.6729 14.38 20.7619 14.458 20.8579 14.53"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
