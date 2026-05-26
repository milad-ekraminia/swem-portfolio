import { SvgProps } from '@/types/icons';

export const TextEditorSvg = ({
  width = '28',
  height = '28',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill={fill}
    >
      <rect
        x="3.5"
        y="3.5"
        width="21"
        height="21"
        rx="5"
        stroke="var(--brand-600)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 18.0833H8.75"
        stroke="var(--brand-600)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 9.91634H14"
        stroke="var(--brand-600)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.25 14.0003H8.75"
        stroke="var(--brand-600)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
