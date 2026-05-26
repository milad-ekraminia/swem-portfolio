import { SvgProps } from '@/types/icons';

export const NotifFailSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2442_73662"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect width="40" height="40" fill="url(#paint0_linear_2442_73662)" />
      </mask>
      <g mask="url(#mask0_2442_73662)">
        <circle cx="20" cy="20" r="19.5" fill="#FFEFEF" stroke="#F04438" />
      </g>
      <rect x="6" y="6" width="28" height="28" rx="14" fill="#D92D20" />
      <path
        d="M21.9998 24.6666C21.9998 25.7712 21.1044 26.6666 19.9998 26.6666C18.8952 26.6666 17.9998 25.7712 17.9998 24.6666M21.1975 16.159C21.4878 15.859 21.6665 15.4503 21.6665 14.9999C21.6665 14.0794 20.9203 13.3333 19.9998 13.3333C19.0793 13.3333 18.3331 14.0794 18.3331 14.9999C18.3331 15.4503 18.5118 15.859 18.8021 16.159M23.9998 19.4666C23.9998 18.5472 23.5784 17.6654 22.8282 17.0153C22.0781 16.3652 21.0607 15.9999 19.9998 15.9999C18.9389 15.9999 17.9215 16.3652 17.1714 17.0153C16.4212 17.6654 15.9998 18.5472 15.9998 19.4666C15.9998 20.9878 15.6226 22.1003 15.1519 22.8964C14.6154 23.8037 14.3471 24.2573 14.3577 24.3657C14.3698 24.4897 14.3922 24.5288 14.4927 24.6023C14.5806 24.6666 15.0222 24.6666 15.9053 24.6666H24.0944C24.9775 24.6666 25.419 24.6666 25.5069 24.6023C25.6075 24.5288 25.6298 24.4897 25.6419 24.3657C25.6525 24.2573 25.3843 23.8037 24.8478 22.8964C24.3771 22.1003 23.9998 20.9878 23.9998 19.4666Z"
        stroke="white"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2442_73662"
          x1="20"
          y1="0"
          x2="20"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
