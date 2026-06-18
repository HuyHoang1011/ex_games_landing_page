type ShopAllPageHeaderProps = {
  totalTitles: number;
};

export default function ShopAllPageHeader({ totalTitles }: Readonly<ShopAllPageHeaderProps>) {
  return (
    <header className='mt-6'>
      <h1 className='font-serif text-5xl font-semibold text-landing-brown-dark md:text-6xl'>All books</h1>
      <p className='mt-3 font-serif text-lg text-[#8a7f72] italic'>{totalTitles} titles in the collection</p>
    </header>
  );
}
