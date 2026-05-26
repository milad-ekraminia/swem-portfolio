import { SvgProps } from '@/types/icons';

export const OutageEnergySvg = ({
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
        d="M18 2.75V7.25C18 7.52614 17.7762 7.75 17.5 7.75H16C15.337 7.75 14.7011 7.48661 14.2322 7.01777C13.7634 6.54893 13.5 5.91304 13.5 5.25V4.75C13.5 3.36929 14.6193 2.25 16 2.25H17.5C17.7762 2.25 18 2.47386 18 2.75Z"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6.5H20"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 3.5H20"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 5H12C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C14.1217 21 16.1566 20.1571 17.6569 18.6569C19.1571 17.1566 20 15.1217 20 13"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.594 10L10 13H14L12.406 16"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
