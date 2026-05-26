import { SvgProps } from '@/types/icons';

export const NavigationSvg = ({
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
        d="M7 9.75L5 11.75L3 9.75"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 3C19.881 3 21 4.119 21 5.5C21 6.881 19.881 8 18.5 8C17.119 8 16 6.881 16 5.5C16 4.119 17.119 3 18.5 3Z"
        stroke="#475467"
        strokeWidth="1.5"
      />
      <path
        d="M16 5.5H7C5.895 5.5 5 6.395 5 7.5V11.75"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 14.25L19 12.25L21 14.25"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 21C4.119 21 3 19.881 3 18.5C3 17.119 4.119 16 5.5 16C6.881 16 8 17.119 8 18.5C8 19.881 6.881 21 5.5 21Z"
        stroke="#475467"
        strokeWidth="1.5"
      />
      <path
        d="M8 18.5H17C18.105 18.5 19 17.605 19 16.5V12.25"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
