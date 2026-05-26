import { SvgProps } from '@/types/icons';

export const MailsSvg = ({
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
        d="M4 8V24C4 26.2093 5.79067 28 8 28H24C26.2093 28 28 26.2093 28 24V8"
        stroke="#344054"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3227 14.6667H20.6773C21.4787 14.6667 22.26 14.4267 22.924 13.9773L26.8293 11.332C27.5613 10.836 28 10.0093 28 9.12533V8C28 5.79067 26.208 4 23.9973 4H8.00267C5.792 4 4 5.79067 4 8V9.12533C4 10.0093 4.43867 10.836 5.172 11.3333L9.07733 13.9787C9.74 14.4267 10.5227 14.6667 11.3227 14.6667Z"
        stroke="#344054"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 11.332C17.1046 11.332 18 10.4366 18 9.33203C18 8.22746 17.1046 7.33203 16 7.33203C14.8954 7.33203 14 8.22746 14 9.33203C14 10.4366 14.8954 11.332 16 11.332Z"
        stroke="#344054"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9999 11.332V17.9987"
        stroke="#344054"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
