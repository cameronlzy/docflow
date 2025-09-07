import { User } from "@/types/user.types.js"
import Link from "next/link"

type DashboardButtonProps = {
  message?: string
  big?: boolean
  user?: User
}

const DashboardButton = ({
  message,
  big = false,
  user,
}: DashboardButtonProps) => {
  const baseClasses =
    "bg-white text-black rounded-lg transition-all duration-200 font-medium inline-block"
  const smallClasses = "hover:bg-gray-100 px-6 py-2"
  const bigClasses =
    "hover:bg-blue-500 px-12 py-4 text-xl font-semibold transform hover:scale-105"

  return (
    <Link
      href={`/dashboard`}
      className={`${baseClasses} ${big ? bigClasses : smallClasses}`}
    >
      {message || (big ? "Go to Dashboard" : "Dashboard")}
    </Link>
  )
}

export default DashboardButton
