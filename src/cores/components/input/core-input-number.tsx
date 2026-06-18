import React, { type ChangeEvent } from 'react';

import { Input, type InputProps } from '@/cores/shadcn/components/ui/input';

interface Props extends Omit<InputProps, 'type'> {
  isFormatNumber?: boolean;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Trigger form's change handler
}

export default function CoreInputNumber({ isFormatNumber = false, value, onChange, ...props }: Readonly<Props>) {
  const normalizeValue = (val: string | number): string | number => {
    if (Array.isArray(val)) {
      return val[0] ?? '';
    }
    return val ?? '';
  };

  const formatNumber = (val: string | number) => {
    const rawValue = typeof val === 'number' ? val : parseFloat(val.replace(/\D/g, '')) || 0;
    return rawValue.toLocaleString();
  };

  // Handle change event and convert to numeric value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ''); // Remove formatting
    const numericValue = rawValue.replace(/\D/g, ''); // Keep only numeric characters
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: parseFloat(numericValue) || 0,
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('Text');
    const numericValue = pastedData.replace(/\D/g, '');

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: parseFloat(numericValue) || 0,
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  const normalizedValue = normalizeValue(Number(value)); // Normalize the value to ensure compatibility

  return (
    <Input
      {...props}
      type='text'
      value={isFormatNumber ? formatNumber(normalizedValue) : normalizedValue} // Display formatted value or raw value
      onChange={handleChange}
      onPaste={handlePaste}
    />
  );
}
