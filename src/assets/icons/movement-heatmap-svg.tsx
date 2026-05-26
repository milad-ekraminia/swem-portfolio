import { SvgProps } from '@/types/icons';

export const MovementHeatmapSVG = ({
  width = '14',
  height = '18',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 18"
      fill={fill}
    >
      <path
        d="M1.43011 6.34895L5.79375 1.58862C6.4423 0.881107 7.5577 0.881106 8.20625 1.58862L12.5699 6.34895C12.8465 6.65074 13 7.04527 13 7.45468V15C13 15.9037 12.2674 16.6363 11.3636 16.6363H2.63636C1.73262 16.6363 1 15.9037 1 15V7.45468C1 7.04527 1.15347 6.65074 1.43011 6.34895Z"
        fill="white"
        stroke="#D0D5DD"
        strokeWidth="1.09091"
      />
      <path
        d="M5.36328 7.90894L5.36328 13.3635"
        stroke="#E4E7EC"
        strokeWidth="1.09091"
        strokeLinecap="round"
      />
      <path
        d="M8.63672 7.90894L8.63672 13.3635"
        stroke="#E4E7EC"
        strokeWidth="1.09091"
        strokeLinecap="round"
      />
    </svg>
  );
};
