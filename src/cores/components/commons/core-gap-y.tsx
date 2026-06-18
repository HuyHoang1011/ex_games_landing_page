interface Props {
  className?: string;
}

export default function CoreGapY({ className = 'mb-2' }: Readonly<Props>) {
  return <div className={className} />;
}
