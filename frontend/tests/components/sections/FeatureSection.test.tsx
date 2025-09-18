import { render, screen } from "@testing-library/react"
import { FeaturesSection } from "@/components/sections/FeaturesSection"

describe("FeaturesSection", () => {
  it("renders heading, subtitle, and feature texts", () => {
    render(<FeaturesSection />)

    expect(
      screen.getByRole("heading", { name: /why choose docflow/i })
    ).toBeTruthy()
    expect(
      screen.getByText(/intelligent automation that transforms/i)
    ).toBeTruthy()
    expect(screen.getByText(/lightning fast ocr/i)).toBeTruthy()
    expect(screen.getByText(/smart classification/i)).toBeTruthy()
    expect(screen.getByText(/data summarisation/i)).toBeTruthy()
  })
})
