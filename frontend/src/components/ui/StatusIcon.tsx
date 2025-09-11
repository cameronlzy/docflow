export default function StatusIcon({
  status,
}: {
  status: "verifying" | "success" | "error"
}) {
  if (status === "success") {
    return (
      <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-600/20 ring-1 ring-emerald-400/30">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-400">
          <path
            fill="currentColor"
            d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"
            opacity=".25"
          />
          <path
            fill="currentColor"
            d="M10.2 14.6l-2.1-2.1a1 1 0 10-1.4 1.4l2.8 2.8a1 1 0 001.4 0l5-5a1 1 0 10-1.4-1.4l-4.3 4.3z"
          />
        </svg>
      </div>
    )
  }
  if (status === "error") {
    return (
      <div className="grid h-14 w-14 place-items-center rounded-full bg-rose-600/20 ring-1 ring-rose-400/30">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-rose-400">
          <path
            fill="currentColor"
            d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"
            opacity=".25"
          />
          <path
            fill="currentColor"
            d="M9.17 8.76a1 1 0 011.41 0L12 10.17l1.41-1.41a1 1 0 111.41 1.41L13.41 11.6l1.41 1.41a1 1 0 01-1.41 1.41L12 13.01l-1.41 1.41a1 1 0 01-1.41-1.41l1.41-1.41-1.41-1.41a1 1 0 010-1.41z"
          />
        </svg>
      </div>
    )
  }
  return (
    <div className="grid h-14 w-14 place-items-center rounded-full bg-indigo-600/20 ring-1 ring-indigo-400/30">
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-indigo-400">
        <path
          fill="currentColor"
          d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z"
          opacity=".25"
        />
        <path
          fill="currentColor"
          d="M12 6a1 1 0 011 1v4.59l2.3 2.3a1 1 0 01-1.42 1.42l-2.6-2.6A1 1 0 0111 12V7a1 1 0 011-1z"
        />
      </svg>
    </div>
  )
}
