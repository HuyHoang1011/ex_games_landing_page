import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

import { Input, type InputProps } from '@/cores/shadcn/components/ui/input';

interface Props extends Omit<InputProps, 'type'> {}

export default function CoreInputPassword({ ...props }: Readonly<Props>) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  return (
    <div className='relative'>
      <Input type={isShowPassword ? 'text' : 'password'} {...props} />
      <button
        type='button'
        onClick={() => setIsShowPassword(!isShowPassword)}
        tabIndex={-1}
        className='absolute right-2 top-1/2 transform -translate-y-1/2'
      >
        {isShowPassword ? <Eye className='text-primary-light' /> : <EyeOff className='text-primary-light' />}
      </button>
    </div>
  );
}
