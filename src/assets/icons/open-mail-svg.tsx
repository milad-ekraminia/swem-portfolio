import { SvgProps } from '@/types/icons';

export const OpenMailSvg = ({
  width = '32',
  height = '32',
  fill = 'none',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}
    >
      <circle
        cx="24"
        cy="13.4844"
        r="6"
        stroke="#323232"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 22.3333V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24V13.8139C4 12.9839 4.38642 12.2013 5.04533 11.6967L14.3787 4.54947C15.3354 3.81684 16.6645 3.81684 17.6213 4.54947L18.9999 5.60522"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6212 20.7849C16.6645 21.5176 15.3353 21.5176 14.3786 20.7849L4.14624 12.9492"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.987 14.0859V15.7526"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.9928 11.2173C24.0196 11.2202 24.0456 11.2067 24.0585 11.183C24.0714 11.1593 24.0688 11.1302 24.0519 11.1092C24.035 11.0882 24.0071 11.0795 23.9812 11.0871C23.9553 11.0947 23.9366 11.1171 23.9337 11.1439V11.1582C23.937 11.1893 23.9617 11.214 23.9928 11.2173"
        stroke="#475467"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
