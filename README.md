# Sistema de Pessoas Desaparecidas - MT

## Dados do Desenvolvedor
- Nome: Lorenna Vitória de Souza e Silva
- E-mail: lorennalovi@gmail.com

## Instalação e Execução
1. Clone o repositório:

   git clone https://github.com/lorennavitoria/desaparecidos-mt-app.git
   cd desaparecidos-mt-app
   
2.Build da imagem Docker:

   docker build -t desaparecidos-mt-app:latest .

3. Rodar o container:

   docker run -p 3000:80 desaparecidos-mt-app:latest

4. Abra o navegador em http://localhost:3000


⚠️ Observação sobre o status de pessoas (Desaparecida / Localizada)

O endpoint da API utilizado pelo sistema:
https://abitus-api.geia.vip/v1/pessoas/aberto/filtro

possui uma limitação importante:

Ele não retorna no objeto de resposta um campo explícito que indique se uma pessoa está Desaparecida ou Localizada.

🔧 Solução implementada no sistema

Para contornar essa limitação, a aplicação define o status com base nos dados disponíveis:

Se o campo ultimaOcorrencia.dataLocalizacao estiver preenchido → a pessoa é tratada como Localizada ✅

Caso contrário → tratada como Desaparecida ❌

Essa solução não garante 100% de precisão, mas permite que o frontend exiba o status mesmo sem a informação explícita no objeto de resposta da API.

