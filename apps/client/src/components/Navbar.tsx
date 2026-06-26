import Image from "next/image"
import Link from "next/link"
import SearchBar from "@/components/SearchBar"
import { Bell, Home, ShoppingCart } from "lucide-react"
import ShoppingCartIcon from "./ShoppingCartIcon"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import ProfileButton from "./Profile"
import { Suspense } from "react"

const Navbar =()=> {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
        {/* Left Side */}
        <Link href="/" className="flex items-center">
        <Image
        src="/logo.png"
        alt="Ecommerce"
        width={36}
        height={36}
        className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">MY ECOMMERCE</p>
        </Link>

        {/* right */}

        <div className="flex items-center gap-6">
            <Suspense fallback={<div>Loading Search...</div>}>
              <SearchBar/>
            </Suspense>
            <Link href="/">
            <Home className="w-4 h-4 text-gray-600"/>
            </Link>
            <Bell className="w-4 h-4 text-gray-600 cursor-pointer"/>
            {/* <ShoppingCart className="w-4 h-4 text-gray-600"/> */}
            <ShoppingCartIcon/>
                        <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <ProfileButton/>
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar