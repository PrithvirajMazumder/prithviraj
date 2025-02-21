import Link from 'next/link'

type Props = {
  heroWidth: number
}
export const Navbar = (props: Props) => {
  return (
    <>
      <div className="flex fixed top-4 md:hidden px-4 py-2 left-1/2 -translate-x-1/2 w-[calc(100svw-2rem)] justify-between gap-4 items-center mobile-nav">
        <Link className="text-background text-xl font-bold italic overflow-hidden font" href="/">
          <span className="nav-item inline-block">Logo</span>
        </Link>
        <button className="flex flex-col gap-2 justify-center items-center w-6 h-6 nav-item">
          <span className="w-full h-[2px] bg-background rounded-full" />
          <span className="w-full h-[2px] bg-background rounded-full" />
        </button>
      </div>
      <div className="hidden fixed top-0 left-1/2 -translate-x-1/2 py-8 z-50 md:flex justify-between gap-12" style={{ width: props.heroWidth }}>
        <Link className="text-background text-2xl overflow-hidden" href="/">
          <span className="nav-item inline-block">About Me</span>
        </Link>
        <Link className="text-background text-2xl overflow-hidden" href="/">
          <span className="nav-item inline-block">Works</span>
        </Link>
        <Link className="text-background text-4xl font-bold italic overflow-hidden font" href="/">
          <span className="nav-item inline-block">Prithvi</span>
        </Link>
        <Link className="text-background text-2xl overflow-hidden" href="#">
          <span className="nav-item inline-block">Blogs</span>
        </Link>
        <Link className="text-background text-2xl overflow-hidden" href="/">
          <span className="nav-item inline-block">Contact</span>
        </Link>
      </div>
    </>
  )
}
