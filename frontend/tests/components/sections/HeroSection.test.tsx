import { render, screen } from "@testing-library/react"
import { HeroSection } from "@/components/sections/HeroSection"

describe("HeroSection", () => {
  it("renders badge, headings, copy, button label and upload area label", () => {
    render(<HeroSection user={null} />)

    expect(screen.getByText(/powered by zapier & chatgpt/i)).toBeTruthy()
    expect(
      screen.getByRole("heading", { name: /document processing/i })
    ).toBeTruthy()
    expect(screen.getByText(/made simple/i)).toBeTruthy()
    expect(
      screen.getByText(
        /upload any document and extract, categorise, and process it/i
      )
    ).toBeTruthy()
    expect(screen.getByText("Get Started ->")).toBeTruthy()
  })
})
