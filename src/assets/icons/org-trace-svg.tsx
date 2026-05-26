import { SvgProps } from '@/types/icons';

export const OrgTraceSvg = ({
  width = '21',
  height = '20',
  fill = 'none',
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
        d="M6.92609 14.0078L6.42589 18.0095"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4314 7.0025V3.42901C18.4314 2.08751 17.3439 1 16.0023 1H3.42511C2.0836 1 0.996094 2.08751 0.996094 3.42901V11.5764C0.996094 12.9179 2.0836 14.0054 3.42511 14.0054H11.0003"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5039 19.0091H13.0012C12.7249 19.0091 12.501 18.7851 12.501 18.5089V18.1027C12.5043 16.9471 13.4403 16.0111 14.5958 16.0078H17.9092C19.0648 16.0111 20.0008 16.9471 20.0041 18.1027V18.5089C20.0041 18.7851 19.7802 19.0091 19.5039 19.0091Z"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2527 13.5017C15.1484 13.4995 14.2548 12.6031 14.2559 11.4988C14.257 10.3946 15.1524 9.5 16.2567 9.5C17.3609 9.5 18.2564 10.3946 18.2575 11.4988C18.2586 12.6031 17.3649 13.4995 16.2607 13.5017H16.2527Z"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.92578 18.008H8.99948"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
