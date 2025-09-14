import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"

describe("HowItWorksSection", () => {
  it("renders title, subtitle, and expected step text", () => {
    render(<HowItWorksSection />)
    expect(
      screen.getByRole("heading", { name: /simple 3-step process/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/from upload to insights in under 30 seconds/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/upload document/i)).toBeInTheDocument()
    expect(screen.getByText(/ai processing/i)).toBeInTheDocument()
    expect(screen.getByText(/get results/i)).toBeInTheDocument()
  })
})
