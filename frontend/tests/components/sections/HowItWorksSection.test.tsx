import { render, screen } from "@testing-library/react"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"

describe("HowItWorksSection", () => {
  it("renders title, subtitle, and expected step text", () => {
    render(<HowItWorksSection />)

    expect(
      screen.getByRole("heading", { name: /simple 3-step process/i })
    ).toBeTruthy()
    expect(
      screen.getByText(/from upload to insights in under 30 seconds/i)
    ).toBeTruthy()
    expect(screen.getByText(/upload document/i)).toBeTruthy()
    expect(screen.getByText(/ai processing/i)).toBeTruthy()
    expect(screen.getByText(/get results/i)).toBeTruthy()
  })
})
