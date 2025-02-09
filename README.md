# Psatier AI

A modern AI-powered chat application built with Next.js and OpenRouter AI. Menyediakan fitur chat interaktif, riwayat percakapan, dan integrasi model AI yang dapat dikustomisasi.

![Preview Application](./psatir.png)

## 🛠 Tech Stack

- **[Next.js 14+](https://nextjs.org/docs)** - Framework React untuk SSR & Static Site Generation
- **[TypeScript 5+](https://www.typescriptlang.org/docs/)** - Static type checking
- **[shadcn/ui](https://ui.shadcn.com/docs)** - Komponen UI modular & dapat dikustomisasi
- **[Vercel AI SDK](https://sdk.vercel.ai/docs)** - Tools untuk membangun aplikasi AI
- **[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)** - Penyimpanan riwayat chat lokal di browser
- **[OpenRouter API](https://openrouter.ai/docs)** - Akses berbagai model AI (Claude, GPT, dll)

## ⚙️ Prerequisites

- Node.js v22.13.1 ([Install via NVM](https://github.com/nvm-sh/nvm))
- OpenRouter API Key ([Dapatkan di sini](https://openrouter.ai/keys))
- Browser modern yang mendukung IndexedDB

## 🚀 Getting Started

1. **Clone Repository**

   ```bash
   git clone https://github.com/RiskiManik/Pstatier-ai.git
   cd repo-name
   ```

2. **Setup Environment Variables**
   Buat file `.env.local` di root project:

   ```env
   OPENROUTER_API_KEY=your_api_key_here
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## ✨ Features

- **Chat Interface**
  - Streaming real-time responses
  - Markdown & code syntax highlighting
- **Chat History**
  - Penyimpanan lokal dengan IndexedDB
  - Akses riwayat percakapan sebelumnya
- **AI Configuration**
  - System prompt statis (default)
  - Switch model AI (DeepSeek R1, GPT-4, dll)
- **UI/UX**
  - Responsive design
  - Optimasi input textarea

## 📌 TODO & Roadmap

- [ ] Dynamic system prompt configuration
- [ ] File upload untuk analisis AI
- [ ] Perbaikan routing logic untuk `/chat/:id`
- [ ] Styling scrollbar pada input area
- [ ] Implementasi authentication
- [ ] Export riwayat chat (PDF/Markdown)

## 🤝 Contributing

Kontribusi terbuka! Berikut langkah-langkahnya:

1. Fork repository
2. Buat branch fitur (`git checkout -b feat/namafitur`)
3. Commit perubahan (`git commit -m 'Tambahkan fitur X'`)
4. Push ke branch (`git push origin feat/namafitur`)
5. Buat Pull Request

**Laporkan bug** melalui [Issues](https://github.com/RiskiManik/Pstatier-ai/issues)

## ⚠️ Known Issues

- Routing `/chat/:id` saat ini terpicu setelah 2x respons AI
- System prompt belum bisa diubah melalui UI
- Scrollbar text input belum memiliki styling khusus

## License

[MIT](https://choosealicense.com/licenses/mit/)

Beberapa optimasi yang dilakukan:

1. Menambahkan placeholder untuk gambar preview
2. Menambahkan link dokumentasi resmi untuk semua tech stack
3. Menyusun TODO list dengan checkbox format
4. Memperjelas known issues yang disebutkan dalam permintaan
5. Menambahkan bagian kontribusi dengan langkah-langkah detail
6. Menyertakan informasi tambahan tentang model AI yang didukung
7. Menambahkan roadmap untuk fitur-fitur potensial

Pastikan untuk:

- Mengganti placeholder `username/repo-name` dengan URL repository asli
- Menambahkan screenshot aktual aplikasi
- Menyesuaikan license sesuai kebutuhan
- Update bagian known issues sesuai perkembangan terbaru aplikasi
