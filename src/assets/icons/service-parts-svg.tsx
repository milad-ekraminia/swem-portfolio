import { SvgProps } from '@/types/icons';

export const ServicePartsSvg = ({
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
        d="M7.5 11.6011C7.55506 14.0469 9.55356 16.001 12 16.001C14.4464 16.001 16.4449 14.0469 16.5 11.6011V11.5636C16.5013 10.2835 15.9514 9.06484 14.9909 8.21874C14.7223 7.99312 14.3472 7.94407 14.0296 8.09305C13.7121 8.24203 13.51 8.5619 13.5119 8.91265L13.5123 11.3761C13.5123 11.5003 13.4115 11.6011 13.2873 11.6011H10.7127C10.5885 11.6011 10.4877 11.5003 10.4877 11.3761L10.4881 8.91265C10.49 8.5619 10.2879 8.24203 9.97036 8.09305C9.65283 7.94407 9.27767 7.99312 9.00911 8.21874C8.04854 9.06484 7.49871 10.2835 7.5 11.5636"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20.7735V15.5391"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20.7736V15.5391"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
