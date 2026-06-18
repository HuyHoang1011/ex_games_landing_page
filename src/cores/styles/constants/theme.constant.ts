interface ICoreTheme {
  FORM: {
    readOnly: string;
    focus: string;
  };
}

export const CORE_THEME: ICoreTheme = {
  FORM: {
    readOnly: 'bg-muted text-muted-foreground cursor-default focus-visible:ring-0 focus-visible:border-muted',
    focus: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  },
};
