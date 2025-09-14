import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { FeaturesSection } from "@/components/sections/FeaturesSection"

describe("FeaturesSection", () => {
  it("renders heading, subtitle, and feature texts", () => {
    render(<FeaturesSection />)
    expect(
      screen.getByRole("heading", { name: /why choose docflow/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/intelligent automation that transforms/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/lightning fast ocr/i)).toBeInTheDocument()
    expect(screen.getByText(/smart classification/i)).toBeInTheDocument()
    expect(screen.getByText(/data summarisation/i)).toBeInTheDocument()
  })
})
