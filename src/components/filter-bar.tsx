"use client"

import { useState } from "react"
import { Search, X, Filter } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "././ui/select"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface FilterBarProps {
  onSearch: (filters: {
    nome?: string
    faixaIdadeInicial?: number
    faixaIdadeFinal?: number
    sexo?: string
    status?: string
  }) => void
}

const FilterBar = ({ onSearch }: FilterBarProps) => {
  const [nome, setNome] = useState("")
  const [faixaInicial, setFaixaInicial] = useState<number | "">("")
  const [faixaFinal, setFaixaFinal] = useState<number | "">("")
  const [sexo, setSexo] = useState("")
  const [status, setStatus] = useState("")

  const handleSearch = () => {
    onSearch({
      nome: nome || undefined,
      faixaIdadeInicial: faixaInicial ? Number(faixaInicial) : undefined,
      faixaIdadeFinal: faixaFinal ? Number(faixaFinal) : undefined,
      sexo: sexo || undefined,
      status: status || undefined,
    })
  }

  const handleClear = () => {
    setNome("")
    setFaixaInicial("")
    setFaixaFinal("")
    setSexo("")
    setStatus("")
    onSearch({})
  }

  return (
    <div className="space-y-4">
      {/* Main search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Digite o nome da pessoa..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Advanced filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Idade mín."
            value={faixaInicial}
            onChange={(e) => setFaixaInicial(e.target.value === "" ? "" : Number(e.target.value))}
            min="0"
            max="120"
          />
          <Input
            type="number"
            placeholder="Idade máx."
            value={faixaFinal}
            onChange={(e) => setFaixaFinal(e.target.value === "" ? "" : Number(e.target.value))}
            min="0"
            max="120"
          />
        </div>

        <Select value={sexo} onValueChange={setSexo}>
          <SelectTrigger>
            <SelectValue placeholder="Sexo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MASCULINO">Masculino</SelectItem>
            <SelectItem value="FEMININO">Feminino</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DESAPARECIDO">Desaparecido</SelectItem>
            <SelectItem value="LOCALIZADO">Localizado</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
