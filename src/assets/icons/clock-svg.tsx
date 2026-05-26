import { SvgProps } from '@/types/icons';

export const ClockSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <g clipPath="url(#clip0_4482_16567)">
        <path
          d="M9.99996 5.0013V10.0013L13.3333 11.668M18.3333 10.0013C18.3333 14.6037 14.6023 18.3346 9.99996 18.3346C5.39759 18.3346 1.66663 14.6037 1.66663 10.0013C1.66663 5.39893 5.39759 1.66797 9.99996 1.66797C14.6023 1.66797 18.3333 5.39893 18.3333 10.0013Z"
          stroke="#344054"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4482_16567">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
