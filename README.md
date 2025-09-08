# PROJETO PRÁTICO – IMPLEMENTAÇÃO FRONT-END

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

