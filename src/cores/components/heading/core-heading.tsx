import React, { type HTMLAttributes } from 'react';

import CoreImage from '@/cores/components/images/core-image';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
  className?: HTMLAttributes<HTMLHeadingElement>['className'];
  iconClassName?: HTMLAttributes<HTMLDivElement>['className'];
  type: HeadingType;
  icon?: any;
}

export default function CoreHeading({ title, type, className, icon, iconClassName, ...rest }: Readonly<Props>) {
  const Tag = type;
  let defaultClassName = 'font-helvetins';

  switch (type) {
    case 'h1':
      defaultClassName += ' text-5xl';
      break;
    case 'h2':
      defaultClassName += ' text-3xl lg:text-5xl';
      break;
    case 'h3':
      defaultClassName += ' text-2xl lg:text-4xl';
      break;
    case 'h4':
      defaultClassName += ' text-xl';
      break;
    case 'h5':
      defaultClassName += ' text-lg';
      break;
    case 'h6':
      defaultClassName += ' text-base';
      break;
    default:
      break;
  }
  return icon ? (
    <div className='flex items-center justify-center gap-2'>
      <CoreImage src={icon} alt={title} parentClassName={iconClassName ?? 'size-20'} />
      <Tag className={`${defaultClassName} ${className}`} {...rest}>
        {title}
      </Tag>
    </div>
  ) : (
    <Tag className={`${defaultClassName} ${className}`} {...rest}>
      {title}
    </Tag>
  );
}
