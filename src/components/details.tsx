"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { buscarPessoaPorId, enviarInformacao, buscarInformacoesDesaparecido } from "../services/api"
import type { Person } from "../types"
import axios from "axios"
import { toast } from "sonner"
import { ArrowLeft, User, Calendar, MapPin, Send, Paperclip, AlertTriangle } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

const Details = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [informacao, setInformacao] = useState("")
  const [data, setData] = useState(new Date().toISOString().split("T")[0])
  const [descricao, setDescricao] = useState("")
  const [foto, setFoto] = useState<File | null>(null)
  const [enviando, setEnviando] = useState(false)

  const [informacoes, setInformacoes] = useState<any[]>([])

  useEffect(() => {
    if (!id) return

    const fetchPerson = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await buscarPessoaPorId(id)
        setPerson(res.data)

    
        if (res.data?.ultimaOcorrencia?.ocoId) {
          const infoRes = await buscarInformacoesDesaparecido(res.data.ultimaOcorrencia.ocoId)
          setInformacoes(infoRes.data)
        }
      } catch (err: unknown) {
        console.error(err)

        if (axios.isAxiosError(err)) {
          const msg = err.response?.data?.message || "Erro ao carregar detalhes da pessoa."
          setError(msg)
          toast.error(msg)
        } else {
          setError("Erro ao carregar detalhes da pessoa.")
          toast.error("Erro ao carregar detalhes da pessoa.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPerson()
  }, [id])

  const handleEnviarInformacao = async () => {
    if (!person || !person.ultimaOcorrencia) return

    if (!informacao || !data || !descricao) {
      const msg = "Preencha todos os campos obrigatórios."
      toast.warning(msg)
      return
    }

    const ocoId = person.ultimaOcorrencia.ocoId

    setEnviando(true)

    try {
      await enviarInformacao(ocoId, informacao, data, descricao || undefined, foto || undefined)
      toast.success("Informação enviada com sucesso!")
      setInformacao("")
      setDescricao("")
      setData(new Date().toISOString().split("T")[0])
      setFoto(null)

  
      try {
        const infoRes = await buscarInformacoesDesaparecido(ocoId)
        setInformacoes(infoRes.data)
      } catch (fetchErr) {
        console.error(fetchErr)
        toast.error("Não foi possível atualizar a lista de informações.")
      }
    } catch (err: unknown) {
      console.error(err)
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Erro ao enviar informação."
        toast.error(msg)
      } else {
        toast.error("Erro ao enviar informação.")
      }
    } finally {
      setEnviando(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive font-medium">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!person) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Pessoa não encontrada</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate("/")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-4">
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
                </div>

                <div className="space-y-3">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{person.nome}</h1>
                    <Badge
                      variant={person.vivo ? "default" : "destructive"}
                      className={person.vivo ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {person.vivo ? "Localizada" : "Desaparecida"}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Idade: {person.idade ?? "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Sexo: {person.sexo ?? "N/A"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {person.ultimaOcorrencia && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Detalhes da Ocorrência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {person.ultimaOcorrencia.dtDesaparecimento && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Data do Desaparecimento</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  )}

                  {person.ultimaOcorrencia.dataLocalizacao && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Data da Localização</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(person.ultimaOcorrencia.dataLocalizacao).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  )}

                  {person.ultimaOcorrencia.localDesaparecimentoConcat && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Local do Desaparecimento</p>
                        <p className="text-sm text-muted-foreground">
                          {person.ultimaOcorrencia.localDesaparecimentoConcat}
                        </p>
                      </div>
                    </div>
                  )}

                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Vestimentas</p>
                        <p className="text-sm text-muted-foreground">
                          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                        </p>
                      </div>
                    </div>
                  )}

                  {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Informações Adicionais</p>
                        <p className="text-sm text-muted-foreground">
                          {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <div
                      className={`h-2 w-2 rounded-full ${person.ultimaOcorrencia.encontradoVivo ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span className="text-sm font-medium">
                      Status: {person.ultimaOcorrencia.encontradoVivo ? "Encontrada Viva" : "Não Localizada"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Informações Registradas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {informacoes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Nenhuma informação registrada ainda.</p>
                ) : (
                  <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                    {informacoes.map((info) => (
                      <Card key={info.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <p className="text-foreground mb-2">{info.informacao}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Data: {new Date(info.data).toLocaleDateString("pt-BR")}
                          </p>
                          {info.anexos && info.anexos.length > 0 && (
                            <div className="mt-3">
                              <p className="font-medium text-sm mb-2">Anexos:</p>
                              <div className="space-y-1">
                                {info.anexos.map((anexo: string, i: number) => (
                                  <a
                                    key={i}
                                    href={anexo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-primary hover:underline text-sm"
                                  >
                                    <Paperclip className="h-3 w-3" />
                                    Ver anexo {i + 1}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Registrar Nova Informação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Informação *</label>
                  <Textarea
                    value={informacao}
                    onChange={(e) => setInformacao(e.target.value)}
                    placeholder="Descreva a informação sobre a pessoa..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data *</label>
                  <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição *</label>
                  <Input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descrição adicional..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Foto (opcional)</label>
                  <Input type="file" accept="image/*" onChange={(e) => e.target.files && setFoto(e.target.files[0])} />
                </div>

                <Button onClick={handleEnviarInformacao} disabled={enviando} className="w-full">
                  {enviando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Informação
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
