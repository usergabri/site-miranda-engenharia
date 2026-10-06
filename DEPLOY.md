# Como publicar o site — engmiranda.com.br

O site é estático (Astro). A hospedagem recomendada é a **Netlify**, gratuita e com HTTPS automático. O domínio continua registrado no **Registro.br**; você só aponta o DNS para a Netlify.

---

## 1. Gerar a pasta do site

No terminal, dentro da pasta do projeto:

```bash
npm install
npm run build
```

A pasta **`dist/`** é o site pronto. Ela é o que vai para a internet.

> Para ver no seu computador antes de publicar: `npm run dev` e abra http://localhost:4321

---

## 2. Criar o site na Netlify

1. Crie uma conta gratuita em https://app.netlify.com/signup (pode entrar com Google ou GitHub).
2. No painel, clique em **Add new site → Deploy manually**.
3. **Arraste a pasta `dist/`** para a área indicada.
4. Em alguns segundos o site fica no ar num endereço provisório, por exemplo `nome-aleatorio.netlify.app`. Abra e confira.
5. (Opcional) Em **Site configuration → Change site name**, troque para `mirandaengenharia`.

> **Alternativa com atualização automática:** suba o projeto para um repositório no GitHub e use **Add new site → Import an existing project**. A Netlify lê o `netlify.toml` e publica sozinha a cada alteração.

---

## 3. Conectar o domínio engmiranda.com.br

### 3.1 Na Netlify
1. Abra o site → **Domain management → Add a domain**.
2. Digite `engmiranda.com.br` → **Verify** → **Add domain**.
3. Quando a Netlify perguntar, escolha **Set up Netlify DNS**. Ela vai mostrar **4 servidores DNS** (nameservers), parecidos com:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   Copie exatamente os que aparecerem para você.

### 3.2 No Registro.br
1. Entre em https://registro.br com o seu CPF/CNPJ e senha.
2. Clique no domínio **engmiranda.com.br**.
3. Na seção **DNS**, clique em **Alterar servidores DNS**.
4. Apague os servidores atuais e cole os **4 servidores da Netlify** (um por linha: Servidor 1, 2, 3, 4).
5. **Salvar**.

### 3.3 Aguardar
- A propagação leva de **alguns minutos a 24 h** (no Registro.br costuma ser rápido).
- Quando o domínio estiver ativo, a Netlify gera o certificado **HTTPS** sozinha (**Domain management → HTTPS**). Se demorar, clique em **Verify DNS configuration** e depois em **Provision certificate**.
- O `www.engmiranda.com.br` redireciona automaticamente para `engmiranda.com.br`. O redirecionamento já está configurado no `netlify.toml`.

---

## 4. Atualizar o site depois

1. Edite o que precisar (veja a seção 5).
2. Rode `npm run build` de novo.
3. Na Netlify: **Deploys → arraste a nova pasta `dist/`**. Se você usa GitHub, basta enviar as alterações.

---

## 5. Onde editar as informações

Tudo fica em **`src/config/site.ts`**:

| Campo | O que colocar | Efeito |
|---|---|---|
| `email` | `'contato@engmiranda.com.br'` | Aparece no Contato e no rodapé |
| `instagram` | `'https://instagram.com/seuperfil'` | Aparece no Contato e no rodapé |
| `cnpj` | `'00.000.000/0001-00'` | Aparece no rodapé |
| `gaId` | `'G-XXXXXXXXXX'` | Liga o Google Analytics |
| `statesServed` | `['PR','MG','SP','SC','MS', ...]` | Estados destacados no mapa |
| `whatsapp` | número e texto padrão | Todos os botões de WhatsApp |

Enquanto o valor for `null`, o item **fica escondido** no site.

Textos, serviços, números, cases, depoimentos e perguntas frequentes ficam em **`src/data/content.ts`**.

> **Atenção ao ligar o Google Analytics:** pela LGPD, é recomendável adicionar um aviso de cookies.

---

## 6. E-mail profissional (contato@engmiranda.com.br)

O e-mail é independente da hospedagem. Opções:

- **Zoho Mail (plano gratuito)**: até 5 contas. https://www.zoho.com/mail/
- **Google Workspace (pago)**: Gmail com o seu domínio.

O provedor escolhido vai pedir alguns registros **MX/TXT**. Como o DNS estará na Netlify, cadastre esses registros em **Netlify → Domains → engmiranda.com.br → DNS settings → Add new record**.

---

## 7. Depois de publicar (recomendado)

1. **Google Search Console** (https://search.google.com/search-console): adicione `engmiranda.com.br` e envie o sitemap `https://engmiranda.com.br/sitemap-index.xml`. Isso faz o site aparecer no Google mais rápido.
2. **Perfil da Empresa no Google** (Google Meu Negócio): cadastre a Miranda Engenharia com o link do site. Ajuda muito nas buscas regionais.
3. Teste o link no WhatsApp: a imagem de prévia (`public/og.jpg`) deve aparecer.
