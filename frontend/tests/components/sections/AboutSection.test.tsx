import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { AboutSection } from "@/components/sections/AboutSection"

describe("AboutSection", () => {
  it("renders the main heading", () => {
    render(<AboutSection />)
    expect(
      screen.getByRole("heading", { name: /why we built this/i })
    ).toBeInTheDocument()
  })

  it("renders both subheadings", () => {
    render(<AboutSection />)
    expect(
      screen.getByRole("heading", { name: /the problem we solved/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: /our solution/i })
    ).toBeInTheDocument()
  })

  it("renders the descriptive paragraphs", () => {
    render(<AboutSection />)

    expect(
      screen.getByText(/information scattered across/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/streamline the entire document summarization process/i)
    ).toBeInTheDocument()
  })
})
