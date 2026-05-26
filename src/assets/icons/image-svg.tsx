import { SvgProps } from '@/types/icons';

export const ImageSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#D0D5DD',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="21"
        y="21"
        width="18"
        height="18"
        rx="5"
        transform="rotate(-180 21 21)"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.36133 17.8675L7.64301 13.5858C8.01808 13.2107 8.52679 13 9.05722 13C9.58766 13 10.0964 13.2107 10.4714 13.5858L17.6182 20.7326"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0007 14.7055L17.8809 11.5858C17.5059 11.2107 16.9972 11 16.4667 11C15.9363 11 15.4276 11.2107 15.0525 11.5858L11.7637 14.8746"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.91179 8.4119L8.91201 8.41169C8.96076 8.36527 9.0379 8.36714 9.08435 8.41586C9.1308 8.46458 9.12898 8.54173 9.08029 8.58821C9.0316 8.63469 8.95445 8.63292 8.90794 8.58425C8.86143 8.53559 8.86315 8.45844 8.91179 8.4119"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
