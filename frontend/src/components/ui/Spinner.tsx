export function Spinner({ size = 32 }: { size?: number }) {
  const style = { width: size, height: size }
  return (
    <span
      style={style}
      className="inline-block rounded-full border-2 border-white border-t-transparent animate-spin"
    />
  )
}
