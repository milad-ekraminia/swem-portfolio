import { SvgProps } from '@/types/icons';

export const AlarmsPageSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#98A2B3',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M16.8449 11.0117C17.2608 10.2092 17.4999 9.3 17.4999 8.33333C17.4999 5.11167 14.8883 2.5 11.6666 2.5C10.6999 2.5 9.79078 2.73917 8.98828 3.155"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 17.5002C5.11083 17.5002 2.5 14.8877 2.5 11.6668C2.5 8.446 5.11083 5.8335 8.33333 5.8335C11.5542 5.8335 14.1667 8.446 14.1667 11.6668C14.1667 14.8877 11.5542 17.5002 8.33333 17.5002"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33464 11.452V9.33203"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33186 13.7916C8.27436 13.7916 8.22686 13.8391 8.22853 13.8966C8.22853 13.9541 8.27603 14.0016 8.33353 14.0016C8.39103 14.0016 8.43686 13.9541 8.43686 13.8966C8.4377 13.8383 8.39103 13.7916 8.33186 13.7916"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
