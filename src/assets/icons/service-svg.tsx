import { SvgProps } from '@/types/icons';

export const ServiceSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#98A2B3',
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
        d="M7.5 11.5999C7.55506 14.0457 9.55356 15.9997 12 15.9997C14.4464 15.9997 16.4449 14.0457 16.5 11.5999V11.5624C16.5013 10.2823 15.9514 9.06362 14.9909 8.21752C14.7223 7.9919 14.3472 7.94285 14.0296 8.09183C13.7121 8.24081 13.51 8.56068 13.5119 8.91143L13.5123 11.3749C13.5123 11.4991 13.4115 11.5999 13.2873 11.5999H10.7127C10.5885 11.5999 10.4877 11.4991 10.4877 11.3749L10.4881 8.91143C10.49 8.56068 10.2879 8.24081 9.97036 8.09183C9.65283 7.94285 9.27767 7.9919 9.00911 8.21752C8.04854 9.06362 7.49871 10.2823 7.5 11.5624"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20.7769V15.5425"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20.777V15.5425"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
