import { SvgProps } from '@/types/icons';

export const TasklistAnalyticsSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = 'var(--brand-600)',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 39"
      fill={fill}
    >
      <rect
        x="13.4292"
        y="4.88184"
        width="12.9954"
        height="6.49771"
        rx="0.812214"
        stroke={stroke}
        strokeWidth="3.24886"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.4245 8.13086H29.6734C31.4677 8.13086 32.9222 9.58542 32.9222 11.3797V30.8728C32.9222 32.6671 31.4677 34.1217 29.6734 34.1217H10.1803C8.38596 34.1217 6.9314 32.6671 6.9314 30.8728V11.3797C6.9314 9.58542 8.38596 8.13086 10.1803 8.13086H13.4291"
        stroke={stroke}
        strokeWidth="3.24886"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2414 17.8779V27.6245"
        stroke={stroke}
        strokeWidth="3.24886"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9268 27.6239V24.375"
        stroke={stroke}
        strokeWidth="3.24886"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.6124 27.6237V21.126"
        stroke={stroke}
        strokeWidth="3.24886"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
