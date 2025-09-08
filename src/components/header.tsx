import { Shield, Phone, Mail } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-sm text-muted-foreground border-b border-border">
          <div className="flex items-center gap-4 mb-2 sm:mb-0">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>(65) 3648-5000</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>contato@pc.mt.gov.br</span>
            </div>
          </div>
          <div className="text-xs">
            Emergência: <span className="font-semibold text-primary">190</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground">Polícia Civil</h1>
              <p className="text-sm text-muted-foreground">Estado de Mato Grosso</p>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <h2 className="text-lg lg:text-xl font-semibold text-primary">Pessoas Desaparecidas</h2>
            <p className="text-sm text-muted-foreground">Sistema de Busca e Informações</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
