import { SvgProps } from '@/types/icons';

export const DescendingChartSvg = ({
  width = '98',
  height = '50',
  fill = 'none',
  stroke = '#17B26A',
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
        id="mask0_3462_75317"
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
          fill="url(#paint0_linear_3462_75317)"
        />
      </mask>
      <g mask="url(#mask0_3462_75317)">
        <path
          opacity="0.2"
          d="M97 1C81.4031 2.29974 80.4372 33.4164 65 37C52.2702 39.9551 45.8241 23.1804 33 25C19.0903 26.9737 14.6391 44.4536 1 49H97V1Z"
          fill="#079455"
        />
      </g>
      <path
        d="M1 49C14.6391 44.4536 19.0903 26.9737 33 25C45.8241 23.1804 52.2702 39.9551 65 37C80.4372 33.4164 81.4031 2.29974 97 1"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.2">
        <rect
          x="72.5"
          y="12.5"
          width="14.5"
          height="14.5"
          rx="7.25"
          stroke={stroke}
          strokeWidth="2"
        />
      </g>
      <rect x="76.25" y="16.25" width="7" height="7" rx="3.5" fill="white" />
      <rect
        x="76.25"
        y="16.25"
        width="7"
        height="7"
        rx="3.5"
        stroke={stroke}
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3462_75317"
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
