import { SvgProps } from '@/types/icons';

export const TapeSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#1570EF',
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
        d="M7.49818 7.49891H16.6687C17.1291 7.49891 17.5023 7.12566 17.5023 6.66523V3.33051C17.5023 2.87008 17.1291 2.49683 16.6687 2.49683H7.49818C4.7356 2.49683 2.49609 4.73634 2.49609 7.49891V12.501"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="7.49818"
        cy="12.5009"
        rx="5.00208"
        ry="5.00208"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse
        cx="7.49939"
        cy="12.5009"
        rx="1.66736"
        ry="1.66736"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49887 2.49683V4.16419"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99887 2.49683V4.99787"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5008 2.49683V4.16419"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0008 2.49683V4.99787"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
