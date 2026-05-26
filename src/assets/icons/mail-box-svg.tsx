import { SvgProps } from '@/types/icons';

export const MailBoxSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#1570EF',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <ellipse
        cx="10.0007"
        cy="9.99992"
        rx="7.91667"
        ry="7.91667"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0007 5.83325V5.41659"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4993 6.66675L12.916 6.25008"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 6.66675L7.08333 6.25008"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.16359 10.4159L10.834 10.4167L11.8399 9.41082C11.9962 9.25455 12.2081 9.16675 12.4292 9.16675H13.334C13.7942 9.16675 14.1673 9.53984 14.1673 10.0001V12.5001C14.1673 12.9603 13.7942 13.3334 13.334 13.3334H6.66732C6.20708 13.3334 5.83398 12.9603 5.83398 12.5001V10.0001C5.83398 9.53984 6.20708 9.16675 6.66732 9.16675H7.57158C7.79292 9.16675 8.00517 9.25481 8.16151 9.41151L9.16359 10.4159Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
