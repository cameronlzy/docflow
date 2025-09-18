import { render, screen } from "@testing-library/react"
import { AboutSection } from "@/components/sections/AboutSection"

describe("AboutSection", () => {
  it("renders the main heading", () => {
    render(<AboutSection />)
    const heading = screen.getByRole("heading", { name: /why we built this/i })
    expect(heading).toBeTruthy()
  })

  it("renders both subheadings", () => {
    render(<AboutSection />)
    const problem = screen.getByRole("heading", {
      name: /the problem we solved/i,
    })
    expect(problem).toBeTruthy()

    const solution = screen.getByRole("heading", { name: /our solution/i })
    expect(solution).toBeTruthy()
  })

  it("renders the descriptive paragraphs", () => {
    render(<AboutSection />)

    const para1 = screen.getByText(/information scattered across/i)
    expect(para1).toBeTruthy()

    const para2 = screen.getByText(
      /streamline the entire document summarization process/i
    )
    expect(para2).toBeTruthy()
  })
})
