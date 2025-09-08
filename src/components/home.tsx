"use client"

import { useEffect, useState } from "react"
import { buscarPessoasFiltro, buscarEstatisticas } from "../services/api"
import type { Person } from "../types"
import { User, Search, AlertTriangle, CheckCircle } from "lucide-react"
import FilterBar from "./filter-bar"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import Pagination from "./Pagination"

const Home = () => {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [filtros, setFiltros] = useState({})

  const navigate = useNavigate()

  const [estatisticas, setEstatisticas] = useState<{
    quantPessoasDesaparecidas: number
    quantPessoasEncontradas: number
  } | null>(null)

  const fetchPeople = async (page = 0, filtrosAtual: any = {}) => {
    setLoading(true)
    setError(null)

// OBS: A API em https://abitus-api.geia.vip/v1/pessoas/aberto/filtro não retorna um campo explícito
// indicando se a pessoa está "Desaparecida" ou "Localizada".  
// Para contornar essa limitação, definimos o status manualmente aqui com base na presença de informações
// da última ocorrência (`ultimaOcorrencia.dataLocalizacao`).  
// Se `dataLocalizacao` estiver preenchida, consideramos "Localizada", caso contrário, "Desaparecida".  
// Essa abordagem não é 100% precisa, mas permite exibir um status no frontend.

    try {
      const res = await buscarPessoasFiltro(filtrosAtual, page, 10)
       const peopleData = res.data.content || res.data
      const peopleWithStatus = peopleData.map((p: any) => ({
      ...p,
      status: p.ultimaOcorrencia?.dataLocalizacao ? "Localizada" : "Desaparecida",
    }))
      setPeople(peopleWithStatus)
      setTotalPages(res.data.totalPages || 1)
    } catch (err: unknown) {
      console.error(err)
      const msg = "Erro ao carregar pessoas."
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const fetchEstatisticas = async () => {
    try {
      const res = await buscarEstatisticas()
      setEstatisticas(res.data)
    } catch (err: unknown) {
      console.error("Erro ao buscar estatísticas", err)
      toast.error("Erro ao carregar estatísticas.")
    }
  }

  const handleSearch = (novosFiltros: any) => {
    setFiltros(novosFiltros)
    setCurrentPage(0)
  }

  useEffect(() => {
    fetchPeople(currentPage, filtros)
  }, [currentPage, filtros])

  useEffect(() => {
    fetchEstatisticas()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white py-8 px-4 w-full">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
    
    <div className="flex items-center gap-4 text-center lg:text-left">
      <img 
        src="src/assets/images/layout_set_logo.png" 
        alt="Logo Polícia Judiciária Civil" 
        className="h-16 w-[220px] object-contain"
      />
      <div>
        <h1 className="font-bold text-xl lg:text-2xl">POLÍCIA JUDICIÁRIA CIVIL</h1>
        <p className="text-lg lg:text-xl font-semibold text-gray-300">ESTADO DE MATO GROSSO</p>
      </div>
    </div>

    <div className="text-center lg:text-right">
      <p className="text-lg font-semibold text-yellow-400 mb-1">DENUNCIE</p>
      <div className="text-xl font-bold">
        <span className="text-red-400">197</span> / <span className="text-red-400">181</span> |{" "}
        <span className="text-red-400">3613-6981</span>
      </div>
    </div>

  </div>
</header>


      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
  
            <div className="text-center space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Sistema de Pessoas Desaparecidas</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Ajude-nos a localizar pessoas desaparecidas. Sua informação pode fazer a diferença.
              </p>
            </div>

  
            {estatisticas && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card className="border-l-4 border-l-destructive">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pessoas Desaparecidas</p>
                        <p className="text-3xl font-bold text-destructive">{estatisticas.quantPessoasDesaparecidas}</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pessoas Localizadas</p>
                        <p className="text-3xl font-bold text-green-600">{estatisticas.quantPessoasEncontradas}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

  
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Filtrar Pessoas</h2>
                </div>
                <FilterBar onSearch={handleSearch} />
              </CardContent>
            </Card>

  
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
            {error && (
              <Card className="border-destructive">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <p className="text-destructive font-medium">{error}</p>
                </CardContent>
              </Card>
            )}


            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {people.map((person) => (
                  <Card
                    key={person.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => navigate(`/details/${person.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                        {person.urlFoto ? (
                          <img
                            src={person.urlFoto || "/placeholder.svg"}
                            alt={person.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <User className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge
                            variant={person.status === "Desaparecida" ? "destructive" : "default"}
                            className={person.status === "Desaparecida" ? "" : "bg-green-500 hover:bg-green-600"}
                          >
                            {person.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{person.nome}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Idade: {person.idade ?? "N/A"}</p>
                          <p>Sexo: {person.sexo ?? "N/A"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}


            {!loading && !error && people.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhuma pessoa encontrada</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os filtros de busca para encontrar mais resultados.
                  </p>
                </CardContent>
              </Card>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-8 px-4 w-full mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">CONTATO</h3>
            <div className="space-y-2 text-gray-300">
              <p className="text-base">
                <span className="font-semibold">Endereço:</span> Avenida Coronel Escolástico, 346, Bairro Bandeirantes
              </p>
              <p className="text-base">
                <span className="font-semibold">Cuiabá-MT</span> - CEP: 78.010-200
              </p>
              <p className="text-base">
                <span className="font-semibold">Telefone:</span> (65) 3613-5602 |
                <a href="https://goo.gl/maps/NmHk3QRv7P4herGi7" className="text-yellow-400 hover:text-yellow-300 underline ml-1">
                  Ver no mapa
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
