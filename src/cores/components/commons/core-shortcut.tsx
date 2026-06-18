interface Props {
  char: string;
  label?: string;
  keyShortCut?: string;
  keyShortCut2?: string;
}

export default function CoreShortcut({ char, label, keyShortCut, keyShortCut2 }: Readonly<Props>) {
  return (
    <p className='text-sm text-white flex items-center gap-x-1'>
      {label && <span>{label}</span>}
      <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-primary px-1.5 font-mono text-[10px] font-medium text-white opacity-100'>
        {keyShortCut && <span className='text-xs'>{keyShortCut}</span>}
        {keyShortCut2 && <span className='text-xs'>{keyShortCut2}</span>}
        {char}
      </kbd>
    </p>
  );
}
