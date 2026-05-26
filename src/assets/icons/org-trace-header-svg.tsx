import { SvgProps } from '@/types/icons';

export const OrgTraceHeaderSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#344054',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M5.83333 10H5C4.30964 10 3.75 10.5596 3.75 11.25V14.1667"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8226 10.0002L8.33301 10.0001"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99967 10V7.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.167 10H15.0003C15.6907 10 16.2503 10.5596 16.2503 11.25V14.1667"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99967 14.1667V12.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="14.583"
        y="14.1665"
        width="3.33333"
        height="3.33333"
        rx="1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="8.33301"
        y="14.1665"
        width="3.33333"
        height="3.33333"
        rx="1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2.08301"
        y="14.1665"
        width="3.33333"
        height="3.33333"
        rx="1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="5.83301"
        y="1.6665"
        width="8.33333"
        height="5.83333"
        rx="1.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
