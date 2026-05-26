import { SvgProps } from '@/types/icons';

export const WardInfoSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = 'white',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99998 10.9331V7.81641"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99915 13.4388C9.88415 13.4388 9.79082 13.5321 9.79165 13.6471C9.79165 13.7621 9.88498 13.8555 9.99998 13.8555C10.115 13.8555 10.2083 13.7621 10.2083 13.6471C10.2083 13.5321 10.115 13.4388 9.99915 13.4388"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6908 3.45062L18.0733 14.6206C18.815 15.919 17.8775 17.5348 16.3825 17.5348H3.61751C2.12167 17.5348 1.18417 15.919 1.92667 14.6206L8.30917 3.45062C9.05667 2.14146 10.9433 2.14146 11.6908 3.45062Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
