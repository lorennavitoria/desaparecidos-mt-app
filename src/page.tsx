"use client"

import { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import Header from "./components/header"
import Home from "./pages/Home"
import Details from "./pages/Details"


function App() {
  return (
    <div className="min-h-screen bg-background">
      <BrowserRouter>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
