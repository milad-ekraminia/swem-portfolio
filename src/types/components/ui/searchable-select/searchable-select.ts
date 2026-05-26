export interface OptionType {
  title: string;
  value: string | number;
  disabled?: boolean;
}

export interface SearchableDropdownProps {
  options: OptionType[];
  label?: string;
  selectedVal: string | number | null | undefined;
  handleChange: (value: string | number | null) => void;
  isRequiredInput?: boolean;
  name: string;
  searchParameterLabel: keyof OptionType;
  placeholder: string;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string | null;
  mainClass?: string;  leftIcon?: React.ReactNode;
  
}
