import { SvgProps } from '@/types/icons';

export const FolderArchiveSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <rect
        x="2"
        y="12"
        width="20"
        height="9"
        rx="2"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15H14"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12V7.45C20 6.34543 19.1046 5.45 18 5.45H13.0291C12.6981 5.45 12.3886 5.2862 12.2024 5.01253L11.1307 3.43747C10.9445 3.1638 10.6349 3 10.3039 3H6C4.89543 3 4 3.89543 4 5V12"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
