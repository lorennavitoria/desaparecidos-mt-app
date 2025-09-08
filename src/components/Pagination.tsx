"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "././ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number
}

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisible = 5 }: PaginationProps) => {
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(currentPage - half, 0)
  let end = start + maxVisible - 1

  if (end >= totalPages) {
    end = totalPages - 1
    start = Math.max(end - maxVisible + 1, 0)
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className="min-w-[40px]"
        >
          {page + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default Pagination
