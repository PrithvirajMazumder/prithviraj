import Link from 'next/link'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'

const DesktopNavAccent = ({ hoveredLinkText }: { hoveredLinkText: string | null; shouldNavigate?: string }) => {
  useEffect(() => {
    if (hoveredLinkText === null) return

    if (hoveredLinkText?.length) {
      gsap.fromTo(
        '.navbar-accent',
        { height: 0 },
        {
          height: '7rem',
          duration: 0.8,
          ease: 'power4.out'
        }
      )
      gsap.fromTo(
        '.nav-accent-char',
        { y: '-120%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1
        }
      )
    }

    if (!hoveredLinkText?.length) {
      gsap.fromTo(
        '.nav-accent-char',
        { y: '0%', opacity: 1, delay: 0.3 },
        {
          y: '120%',
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.in'
        }
      )
      gsap.to('.navbar-accent', {
        height: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power4.inOut'
      })
    }
  }, [hoveredLinkText])

  return (
    <div className="navbar-accent bg-foreground fixed w-svw h-0 flex justify-center items-center overflow-hidden z-30">
      <p className="text-[12rem] text-background font-black italic overflow-hidden w-full text-center opacity-10">
        {(hoveredLinkText ?? '').split('').map((char, i) => (
          <span
            key={`nav-accent-char-${i}`}
            className="inline-block nav-accent-char origin-top"
            style={{ transform: 'translateY(-120%)', opacity: 0 }}
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  )
}

const DesktopNavItem = ({
  title,
  onMouseLeave,
  onMouseEnter,
  className,
  onClick,
  id
}: {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  title: string
  href: string
  className?: string
  id: string
  onClick: () => void
}) => {
  return (
    <p
      role="button"
      onClick={onClick}
      className={`text-white text-2xl overflow-hidden ${className ?? ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span id={id} className="nav-item inline-block mix-blend-difference">
        {title.split('').map((char, i) => (
          <span key={`nav-item-char-${i}`} className="inline-block nav-item-char origin-top" style={{ transform: 'translateY(0)', opacity: 1 }}>
            {char}
          </span>
        ))}
      </span>
    </p>
  )
}

const navItems = [
  { title: 'About', href: '/' },
  { title: 'Works', href: '/' },
  { title: 'Prithvi', href: '/', className: 'text-4xl font-bold italic font' },
  { title: 'Blogs', href: '#' },
  { title: 'Contact', href: '/' }
]

type Props = {
  heroWidth: number
}
export const Navbar = (props: Props) => {
  const [hoveredLinkText, setHoveredLinkText] = useState<string | null>(null)

  return (
    <>
      <DesktopNavAccent hoveredLinkText={hoveredLinkText} />
      <div className="flex fixed top-4 md:hidden px-4 py-2 left-1/2 -translate-x-1/2 w-[calc(100svw-2rem)] justify-between gap-4 items-center mobile-nav">
        <Link className="text-white text-xl font-bold italic overflow-hidden font mix-blend-difference" href="/">
          <span className="nav-item inline-block">Logo</span>
        </Link>
        <button className="flex flex-col gap-2 justify-center items-center w-6 h-6 nav-item mix-blend-difference">
          <span className="w-full h-[2px] bg-white rounded-full" />
          <span className="w-full h-[2px] bg-white rounded-full" />
        </button>
      </div>
      <div
        className="hidden fixed top-0 left-1/2 -translate-x-1/2 py-8 z-30 md:flex justify-between gap-12 mix-blend-difference"
        style={{ width: props.heroWidth }}
      >
        {navItems.map((item, index) => (
          <DesktopNavItem
            onClick={() => {
              setHoveredLinkText(item.title)
            }}
            key={`nav-item-${index}`}
            id={`nav-item-${index}`}
            title={item.title}
            href={item.href}
            className={item.className}
            onMouseEnter={() => {
              setHoveredLinkText(item.title)
            }}
            onMouseLeave={() => {
              setHoveredLinkText('')
            }}
          />
        ))}
      </div>
    </>
  )
}
