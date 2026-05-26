import { SvgProps } from '@/types/icons';

export const UploadSvgIcon = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = 'white',
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
        d="M13.3337 9.99935L10.0003 6.66601M10.0003 6.66601L6.66699 9.99935M10.0003 6.66601V14.3327C10.0003 15.4916 10.0003 16.0711 10.4591 16.7199C10.7639 17.1509 11.6415 17.6829 12.1647 17.7538C12.9521 17.8605 13.2511 17.7045 13.8491 17.3926C16.5142 16.0023 18.3337 13.2133 18.3337 9.99935C18.3337 5.39697 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 13.0839 3.34282 15.777 5.83366 17.2178"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
