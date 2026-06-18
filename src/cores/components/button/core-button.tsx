import * as LucideIcons from 'lucide-react';
import { type ReactNode } from 'react';

import CoreImage from '@/cores/components/images/core-image';
import { Button } from '@/cores/shadcn/components/ui/button';
import { cn } from '@/cores/shadcn/lib/utils';
import { type ICoreButton } from '@/cores/types/core-theme.type';

// ? ICoreButton là interface gốc
interface Props extends ICoreButton {
  renderTitle?: ReactNode;
}

export default function CoreButton({
  icon,
  iconType = 'lucide',
  title,
  renderTitle,
  className,
  iconClassName = '',
  titleClassName = '',
  iconPosition = 'left',
  ...rest
}: Props) {
  const isSizeIcon = rest.size === 'icon';
  const isHaveTitle = title && !isSizeIcon;

  let RenderIcon: ReactNode = null;

  if (iconType === 'lucide') {
    const Icon = LucideIcons[icon as keyof typeof LucideIcons] as any;
    RenderIcon = Icon ? <Icon className={cn(isHaveTitle ? 'size-5' : 'size-4', iconClassName)} /> : null;
  } else if (iconType === 'svg') {
    // ? Tạo alt text mô tả chức năng
    const getAltText = () => {
      if (!title) return 'icon';
      if (iconPosition === 'left') return `Biểu tượng bên trái nút ${title?.toLowerCase() ?? 'icon left'}`;
      if (iconPosition === 'right') return `Biểu tượng bên phải nút ${title?.toLowerCase() ?? 'icon right'}`;
      return 'icon';
    };

    RenderIcon = (
      <CoreImage
        type='icon'
        src={icon as string}
        alt={getAltText()}
        parentClassName={cn('flex-shrink-0', isHaveTitle ? 'size-5' : 'size-4', iconClassName)}
        aria-hidden={isHaveTitle ? 'true' : 'false'} // ? Ẩn với screen reader nếu có title
      />
    );
  }

  return (
    <Button className={cn('cursor-pointer', className)} {...rest}>
      {iconPosition === 'left' && RenderIcon}
      {(isHaveTitle || renderTitle) && (
        <span className={cn('text-sm', titleClassName)}>
          {title ?? ''}
          {renderTitle}
        </span>
      )}
      {iconPosition === 'right' && RenderIcon}
    </Button>
  );
}
