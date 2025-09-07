import { User } from "@/types/user.types.js"
import Link from "next/link"

type GetStartedProps = {
  message?: string
  big?: boolean
  user?: User | null
}

const GetStarted = ({ message, big = false, user }: GetStartedProps) => {
  const baseClasses =
    "bg-white text-black rounded-lg transition-all duration-200 font-medium inline-block"
  const smallClasses = "hover:bg-gray-200 px-6 py-2"
  const bigClasses =
    "hover:bg-gray-100 px-12 py-4 text-xl font-semibold transform hover:scale-105"

  return (
    <Link
      href={user ? "/dashboard" : "/auth"}
      className={`${baseClasses} ${big ? bigClasses : smallClasses}`}
    >
      {message || (big ? "Get Started Now" : "Get Started")}
    </Link>
  )
}

export default GetStarted
