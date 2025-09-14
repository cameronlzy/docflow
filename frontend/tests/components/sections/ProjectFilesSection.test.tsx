import { render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProjectFilesSection } from "@/components/sections/ProjectFilesSection"
import type { ProjectFile } from "@/types/project.types.js"

describe("ProjectFilesSection", () => {
  const files: ProjectFile[] = [
    { _id: "1", name: "Proposal.pdf", type: "pdf", size: "1.2 MB" },
    { _id: "2", name: "Invoice.docx", type: "docx", size: "220 KB" },
    { _id: "3", name: "Diagram.png", type: "image", size: "540 KB" },
  ]

  it("renders header and count", () => {
    render(<ProjectFilesSection files={files} />)
    expect(
      screen.getByRole("heading", { name: /project files/i })
    ).toBeInTheDocument()
    expect(screen.getByText(`${files.length} files`)).toBeInTheDocument()
  })

  it("renders name, badge, and size", () => {
    render(<ProjectFilesSection files={files} />)
    files.forEach((f) => {
      const nameEl = screen.getByText(f.name)
      expect(nameEl).toBeInTheDocument()

      const row = nameEl.closest(".p-3") || nameEl.closest('[class*=" p-3"]')
      expect(row).toBeTruthy()

      expect(
        within(row as HTMLElement).getByText(f.type.toUpperCase())
      ).toBeInTheDocument()
      expect(screen.getByText(f.size)).toBeInTheDocument()
    })
  })

  it("falls back for unknown types", () => {
    const weird: ProjectFile = {
      _id: "x",
      name: "data.bin",
      type: "binary",
      size: "12 KB",
    }
    render(<ProjectFilesSection files={[weird]} />)
    expect(screen.getByText("data.bin")).toBeInTheDocument()
    expect(screen.getByText("BINARY")).toBeInTheDocument()
  })
})
