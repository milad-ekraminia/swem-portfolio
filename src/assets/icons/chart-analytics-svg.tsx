import { SvgProps } from '@/types/icons';

export const ChartAnalyticsSvg = ({
  width = '24',
  height = '25',
  fill = 'none',
  stroke = '#98A2B3',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill={fill}
    >
      <path
        d="M19.5 8.61108L21 10.1111"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14.1111V16.1111C21 18.8725 18.7614 21.1111 16 21.1111H8C5.23858 21.1111 3 18.8725 3 16.1111V8.11108C3 5.34966 5.23858 3.11108 8 3.11108H11"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16.1111V14.1111"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.1111V11.6111"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16.1111V13.1111"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="17"
        cy="6.11108"
        r="3.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
