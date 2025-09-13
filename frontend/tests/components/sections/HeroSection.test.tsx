import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { HeroSection } from "@/components/sections/HeroSection"

describe("HeroSection", () => {
  it("renders badge, headings, copy, button label and upload area label", () => {
    render(<HeroSection user={null} />)
    expect(screen.getByText(/powered by zapier & chatgpt/i)).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /document processing/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/made simple/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /upload any document and extract, categorise, and process it/i
      )
    ).toBeInTheDocument()
    expect(screen.getByText("Get Started ->")).toBeInTheDocument()
  })
})
