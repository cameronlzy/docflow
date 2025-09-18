import { render, screen } from "@testing-library/react"
import { CTASection } from "@/components/sections/CTASection"

describe("CTASection", () => {
  it("renders the main heading and tagline", () => {
    render(<CTASection user={null} />)

    const heading = screen.getByRole("heading", {
      name: /ready to transform your workflow\?/i,
    })
    expect(heading).toBeTruthy()

    const tagline = screen.getByText(
      /start processing documents smarter, not harder/i
    )
    expect(tagline).toBeTruthy()
  })

  it("renders the Get Started button text", () => {
    render(<CTASection user={null} />)
    const btn = screen.getByText("Get Started Now")
    expect(btn).toBeTruthy()
  })
})
