import { SvgProps } from '@/types/icons';

export const MultiUsersSvg = ({
  width = '32',
  height = '32',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}
    >
      <path
        d="M20 25.3333V24.6667C20 22.0893 17.9107 20 15.3333 20H8.66667C6.08934 20 4 22.0893 4 24.6667V25.3333"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="12"
        cy="9.99967"
        rx="4.66667"
        ry="4.66667"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.3333 25.3333V24.6667C29.3333 22.0893 27.244 20 24.6667 20H24"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3334 5.33301C23.9107 5.33301 26 7.42235 26 9.99967C26 12.577 23.9107 14.6663 21.3334 14.6663"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
