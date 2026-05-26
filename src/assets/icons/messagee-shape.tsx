import { SvgProps } from '@/types/icons';

export const MessageShape = ({
  width = '15',
  height = '14',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 14"
      fill={fill}
    >
      <path
        d="M4.87467 8.65292C4.46895 11.0872 2.17762 13.3727 0.829102 13.9122C6.00743 13.9122 9.32479 12.1591 10.1339 11.0803L14.1795 12.2939L13.7749 0.157227H5.27922V1.77545V3.39368V3.79824C5.27922 4.60735 5.27922 6.22558 4.87467 8.65292Z"
        fill="#E9E9EB"
      />
    </svg>
  );
};
