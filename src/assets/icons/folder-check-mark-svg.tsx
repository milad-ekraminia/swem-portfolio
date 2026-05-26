import { SvgProps } from '@/types/icons';

export const FolderCheckMarkSvg = ({
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
        d="M17 4.205H12.279C11.9481 4.205 11.6386 4.04126 11.4525 3.76768L10.547 2.43706C10.361 2.16365 10.0517 2.00001 9.721 2H7C5.89543 2 5 2.89543 5 4V4V13.0011C5 14.1051 5.89494 15 6.9989 15H17C18.1046 15 19 14.1046 19 13V13V6.205C19 5.10043 18.1046 4.205 17 4.205Z"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6 8.5L11.6 10.5L10.4 9.3"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.02V16.52"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15V18"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20H20"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20H10"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="20"
        r="2"
        stroke="#323232"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
