import { SvgProps } from '@/types/icons';

export const RainSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = 'var(--brand-600)',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
    >
      <g clipPath="url(#clip0_4046_300498)">
        <path
          d="M14.6654 10.6668C14.6654 12.876 12.8745 14.6668 10.6654 14.6668C8.45623 14.6668 6.66536 12.876 6.66536 10.6668C6.66536 7.79102 10.6654 1.3335 10.6654 1.3335C10.6654 1.3335 14.6654 7.79102 14.6654 10.6668Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.33203 6.00016C5.33203 7.10473 4.4366 8.00016 3.33203 8.00016C2.22746 8.00016 1.33203 7.10473 1.33203 6.00016C1.33203 4.56226 3.33203 1.3335 3.33203 1.3335C3.33203 1.3335 5.33203 4.56226 5.33203 6.00016Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4046_300498">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
