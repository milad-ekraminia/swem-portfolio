import { SvgProps } from '@/types/icons';

export const AscendingChartSvg = ({
  width = '98',
  height = '50',
  fill = 'none',
  stroke = '#F04438',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 98 50"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_3462_75572"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="96"
        height="48"
      >
        <rect
          width="96"
          height="48"
          transform="translate(1 1)"
          fill="url(#paint0_linear_3462_75572)"
        />
      </mask>
      <g mask="url(#mask0_3462_75572)">
        <path
          opacity="0.2"
          d="M1 1C16.5969 2.29974 17.5628 33.4164 33 37C45.7298 39.9551 52.1759 23.1804 65 25C78.9097 26.9737 83.3609 44.4536 97 49H1V1Z"
          fill="#D92D20"
        />
      </g>
      <path
        d="M97 49C83.3609 44.4536 78.9097 26.9737 65 25C52.1759 23.1804 45.7298 39.9551 33 37C17.5628 33.4164 16.5969 2.29974 1 1"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.2">
        <rect
          x="72.5"
          y="27.5"
          width="14.5"
          height="14.5"
          rx="7.25"
          stroke={stroke}
          strokeWidth="2"
        />
      </g>
      <rect x="76.25" y="31.25" width="7" height="7" rx="3.5" fill="white" />
      <rect
        x="76.25"
        y="31.25"
        width="7"
        height="7"
        rx="3.5"
        stroke={stroke}
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3462_75572"
          x1="48"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
