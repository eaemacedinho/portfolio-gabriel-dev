# Gabriel Macedo — Portfólio de desenvolvimento

Landing page pessoal para apresentação e venda de serviços de desenvolvimento de sites, aplicativos, sistemas internos e automações.

## Direção do projeto

A página foi estruturada para vender **capacidade de resolver problemas**, e não apenas exibir tecnologias.

A narrativa principal é:

1. **Quem é o Gabriel**
2. **Quais tipos de problema ele resolve**
3. **Cases reais: problema → solução → recursos**
4. **Como o projeto é conduzido**
5. **CTA direto para iniciar uma conversa**

O **Almas para Cristo** aparece em primeiro lugar entre os cases, como solicitado.

## Stack

- React
- TypeScript
- Vite
- Firebase / Firestore
- CSS responsivo sem framework visual

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Conectar ao Firebase

Projeto já definido em `.firebaserc`:

```txt
portfolio-gabriel-dev
```

No Firebase Console:

1. Abra **Project settings → General**.
2. Em **Your apps**, crie/abra um app Web.
3. Copie as credenciais para `.env.local`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=portfolio-gabriel-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portfolio-gabriel-dev
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

4. Ative **Cloud Firestore**.
5. Publique as regras do arquivo `firestore.rules`.

### Coleção criada pelo formulário

O formulário “Vamos conversar?” grava em:

```txt
leads/{autoId}
```

Campos:

- `name`
- `phone`
- `projectType`
- `idea`
- `source = "portfolio"`
- `status = "new"`
- `createdAt`

As regras permitem **criação pública validada**, mas bloqueiam leitura/edição/remoção pelo cliente.

> Para produção, ative também **Firebase App Check**. Se o site receber volume relevante ou spam, o próximo passo recomendado é mover a escrita do formulário para uma Cloud Function com rate limit.

## Deploy no Firebase Hosting

Com o Firebase CLI:

```bash
npm run build
firebase login
firebase use portfolio-gabriel-dev
firebase deploy
```

## Imagens dos projetos

A primeira versão já possui composições visuais premium geradas em CSS/React, inspiradas na linguagem de produto de Apple e Linear: mockups com profundidade, telas sobrepostas, microcards, callouts e recortes de interface. Assim nenhum case fica dependente de screenshots provisórios.

A próxima melhoria recomendada é substituir/combinar esses mockups com screenshots reais, preferencialmente em WebP:

```txt
public/projects/
  almas-01.webp
  almas-02.webp
  lavahub-01.webp
  beforepreview-01.webp
  meu-influ-01.webp
  solar-site-01.webp
  solar-crm-01.webp
  meu-influ-crm-01.webp
  camilla-form-01.webp
```

## Itens para personalizar antes de publicar

- Trocar a foto do GitHub por uma foto de perfil própria em alta resolução, se desejar.
- Adicionar Instagram / LinkedIn / TikTok no rodapé.
- Adicionar screenshots reais dos projetos.
- Validar quais cases podem exibir link público.
- Ajustar textos de Solar Express com detalhes específicos do projeto.
- Adicionar domínio personalizado.
- Configurar Analytics e eventos de conversão depois que o site estiver no ar.
