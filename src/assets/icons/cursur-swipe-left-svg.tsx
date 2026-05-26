import { SvgProps } from '@/types/icons';

export const CursurSwipeLeftSvg = ({
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
      <path
        d="M3.73163 10.232C2.75563 11.208 2.75563 12.791 3.73163 13.768C4.70763 14.744 6.29062 14.744 7.26762 13.768C8.24462 12.792 8.24362 11.209 7.26762 10.232C6.29062 9.256 4.70863 9.256 3.73163 10.232"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9143 10.086L11.0003 12L13.0273 14.027"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12H17"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.062 18.751C7.647 20.147 9.722 21 12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3C9.722 3 7.647 3.853 6.062 5.249"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
