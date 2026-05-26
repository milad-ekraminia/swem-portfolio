import { SvgProps } from '@/types/icons';

export const DocumentSvg = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.414 6.414L15.586 3.586C15.211 3.211 14.702 3 14.172 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H17C18.105 21 19 20.105 19 19V7.828C19 7.298 18.789 6.789 18.414 6.414V6.414Z"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 8H15C14.448 8 14 7.552 14 7V3"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.50012 16.966C8.50012 16.963 8.49812 16.961 8.49512 16.961C8.49212 16.961 8.49012 16.963 8.49012 16.966C8.49012 16.969 8.49212 16.971 8.49512 16.971C8.49812 16.971 8.50012 16.969 8.50012 16.966"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.995H16"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.995H16"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5001 17C15.5001 16.997 15.4981 16.995 15.4951 16.995C15.4921 16.995 15.4901 16.997 15.4901 17C15.4901 17.003 15.4921 17.005 15.4951 17.005C15.4981 17.005 15.5001 17.003 15.5001 17"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.005 16.99C12.005 16.987 12.003 16.985 12 16.985C11.997 16.985 11.995 16.987 11.995 16.99C11.995 16.993 11.997 16.995 12 16.995C12.003 16.995 12.005 16.993 12.005 16.99"
        stroke="#475467"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
