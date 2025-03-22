import { SectionIDs } from '@/constants/sectionsIds'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-svw flex z-50 py-6 px-16 items-center">
      <Link href={`#${SectionIDs.landingPage}`} className="mr-auto navbar-link">
        <span className="text-2xl text-background">@Prithviraj Mazumder</span>
      </Link>
      <Link href={`#${SectionIDs.landingPage}`} className="navbar-link">
        <span className="text-2xl text-background">About,</span>
      </Link>
      <Link href={`#${SectionIDs.landingPage}`} className="navbar-link">
        <span className="text-2xl text-background">Works,</span>
      </Link>
      <Link href={`#${SectionIDs.landingPage}`} className="navbar-link">
        <span className="text-2xl text-background">Contact</span>
      </Link>
    </nav>
  )
}
