import { SvgProps } from '@/types/icons';

export const HomeIcon = ({
  width = '20',
  height = '21',
  fill = 'none',
  stroke = '#667085',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.535 7.41604L11.535 3.52687C10.6325 2.82438 9.36833 2.82438 8.465 3.52687L3.465 7.41604C2.85583 7.88938 2.5 8.61771 2.5 9.38937V15.5002C2.5 16.881 3.61917 18.0002 5 18.0002H15C16.3808 18.0002 17.5 16.881 17.5 15.5002V9.38937C17.5 8.61771 17.1442 7.88938 16.535 7.41604Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M13.3337 12.3652C11.492 14.2069 8.50699 14.2069 6.66699 12.3652"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
