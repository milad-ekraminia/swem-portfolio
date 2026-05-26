import { SvgProps } from '@/types/icons';

export const NoPowerSvg = ({
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
      <circle
        cx="12.0001"
        cy="12"
        r="9.00375"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5603 5.71132L8.06063 8.21236"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7852 15.9393L18.2862 18.4411"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6881 7.21501C11.815 7.04538 12.035 6.97407 12.2372 7.037C12.4395 7.09993 12.5802 7.28345 12.5885 7.49513V10.7475H15.5017C15.6843 10.7502 15.8509 10.8523 15.9363 11.0137C16.0217 11.1752 16.0123 11.3703 15.9119 11.5228L12.3104 16.785C12.1835 16.9546 11.9635 17.0259 11.7612 16.963C11.5589 16.9001 11.4182 16.7166 11.41 16.5049V13.2525H8.49876C8.31616 13.2498 8.14957 13.1477 8.06417 12.9863C7.97876 12.8249 7.98813 12.6297 8.08859 12.4772L11.6881 7.21501Z"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
