import { SvgProps } from '@/types/icons';

export const OfficeSvg = ({
  width = '21',
  height = '20',
  fill = 'none',
  stroke = '#98A2B3',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill={fill}
    >
      <path
        d="M6.92683 14.0017L6.42662 18.0034"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4316 6.99884V3.42535C18.4316 2.08384 17.3441 0.996338 16.0026 0.996338H3.42535C2.08384 0.996338 0.996338 2.08384 0.996338 3.42535V11.5727C0.996338 12.9142 2.08384 14.0018 3.42535 14.0018H11.0005"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5041 19.0039H13.0014C12.7252 19.0039 12.5012 18.78 12.5012 18.5037V18.0976C12.5045 16.942 13.4405 16.006 14.5961 16.0027H17.9095C19.0651 16.006 20.001 16.942 20.0043 18.0976V18.5037C20.0043 18.78 19.7804 19.0039 19.5041 19.0039Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2527 13.5017C15.1484 13.4995 14.2548 12.6031 14.2559 11.4988C14.257 10.3946 15.1524 9.5 16.2567 9.5C17.3609 9.5 18.2564 10.3946 18.2575 11.4988C18.2586 12.6031 17.3649 13.4995 16.2607 13.5017H16.2527Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.92603 18.0034H8.99972"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
