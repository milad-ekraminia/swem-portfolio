import { SvgProps } from '@/types/icons';

export const CursurSwipeRightSvg = ({
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
        d="M20.2679 10.232C21.2439 11.208 21.2439 12.791 20.2679 13.768C19.2919 14.744 17.7089 14.744 16.7319 13.768C15.7549 12.792 15.7559 11.209 16.7319 10.232C17.7089 9.256 19.2909 9.256 20.2679 10.232"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0859 10.086L12.9999 12L10.9729 14.027"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 12H7"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.938 18.751C16.353 20.147 14.278 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C14.278 3 16.353 3.853 17.938 5.249"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
