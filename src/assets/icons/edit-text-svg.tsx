import { SvgProps } from '@/types/icons';

export const EditTextSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#98A2B3',
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
        d="M21 5C21.0001 4.46952 20.7895 3.96073 20.4144 3.58563C20.0393 3.21052 19.5305 2.99985 19 3"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12V13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8V9"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16C21.0001 16.5305 20.7895 17.0393 20.4144 17.4144C20.0393 17.7895 19.5305 18.0001 19 18"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3C7.46952 2.99985 6.96073 3.21052 6.58563 3.58563C6.21052 3.96073 5.99985 4.46952 6 5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3H16"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 3H12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 21H5C4.46952 21.0001 3.96073 20.7895 3.58563 20.4144C3.21052 20.0393 2.99985 19.5305 3 19V10C2.99985 9.46952 3.21052 8.96073 3.58563 8.58563C3.96073 8.21052 4.46952 7.99985 5 8H14C14.5305 7.99985 15.0393 8.21052 15.4144 8.58563C15.7895 8.96073 16.0001 9.46952 16 10V19C16.0001 19.5305 15.7895 20.0393 15.4144 20.4144C15.0393 20.7895 14.5305 21.0001 14 21Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 11.5H13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17.5H9"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 14.5H13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
