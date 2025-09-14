import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { CTASection } from "@/components/sections/CTASection"

describe("CTASection", () => {
  it("renders the main heading and tagline", () => {
    render(<CTASection user={null} />)
    expect(
      screen.getByRole("heading", {
        name: /ready to transform your workflow\?/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/start processing documents smarter, not harder/i)
    ).toBeInTheDocument()
  })

  it("renders the Get Started button text", () => {
    render(<CTASection user={null} />)
    expect(screen.getByText("Get Started Now")).toBeInTheDocument()
  })
})
