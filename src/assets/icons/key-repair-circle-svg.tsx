import { SvgProps } from '@/types/icons';

export const KeyRepairCircleSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#D0D5DD',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 10.1663C6.29588 12.2045 7.9613 13.8328 10 13.8328C12.0387 13.8328 13.7041 12.2045 13.75 10.1663V10.135C13.7511 9.06829 13.2929 8.05273 12.4924 7.34765C12.2686 7.15963 11.956 7.11876 11.6913 7.24291C11.4267 7.36706 11.2583 7.63362 11.2599 7.9259L11.2602 9.97876C11.2602 10.0823 11.1763 10.1663 11.0727 10.1663H8.92728C8.82372 10.1663 8.73978 10.0823 8.73978 9.97876L8.74009 7.9259C8.74164 7.63362 8.57325 7.36706 8.30864 7.24291C8.04402 7.11876 7.73139 7.15963 7.50759 7.34765C6.70712 8.05273 6.24892 9.06829 6.25 10.135"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="10.5"
        r="7.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33268 17.8152V13.4531"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 17.8152V13.4531"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
