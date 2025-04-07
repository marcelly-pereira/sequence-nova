
export interface SelectOption {
    value: string;
    label: string;
  }
  

  export interface ColorOption {
    id: string;
    color: string;
  }

  export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'select' | 'color';
    required?: boolean;
    placeholder?: string;
    options?: SelectOption[];
  }
  

  export interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    title: string;
    fields: FormField[];
    primaryColor?: string;
  }
  

  export interface FormData {
    [key: string]: any;
    color?: string;
  }