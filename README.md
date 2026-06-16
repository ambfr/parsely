
# 🌿 Parsely

> your code. every personality.

Parsely is an AI-powered web app that explains any code snippet through 6 wildly different creative lenses. Paste your code, pick a personality, and watch it transform.

**Live demo:** https://parsely-steel.vercel.app

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Main App
![Main App](screenshots/main.png)

### Guest mode
![guest mode](screenshots/guest.png)

### Working
![working](screenshots/working.png)

### History expand
![history expand](screenshots/historyexpand.png)

### History export
![export](screenshots/historyexport.png)

---

## Example pdf
![export history pdf](parsely-history.pdf)

## ✨ Features

- 🎬 **Cinematic** — your code narrated as a Hollywood epic
- 🍳 **Cooking** — your code explained as a recipe
- 🔥 **Roast Me** — brutally honest critique of your code
- 👴 **Grandma** — zero jargon, grandma-friendly explanation
- ⚔️ **Medieval** — explained by a 13th century peasant
- 🔮 **Horoscope** — your code's personality and fate

### Plus:
- Google Sign-In or Guest mode
- Full explanation history saved per user
- Export any explanation as a PDF
- Select multiple history items and export as one PDF
- Retro pixel UI with Press Start 2P font

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS + inline styles |
| AI | Groq API (llama-3.3-70b) |
| Auth | Supabase Google OAuth |
| Database | Supabase PostgreSQL |
| PDF Export | jsPDF |
| Deployment | Vercel |

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- A Supabase account (free)
- A Groq API key (free at console.groq.com)

### Steps

**1. Clone the repo**
```bash
git clone https://github.com/YOURUSERNAME/parsely.git
cd parsely
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the root**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

**4. Set up Supabase**

Run this SQL in your Supabase SQL editor:
```sql
create table history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  code text not null,
  mode text not null,
  output text not null,
  created_at timestamptz default now()
);

alter table history enable row level security;

create policy "allow all for authenticated users"
  on history for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

**5. Start the dev server**
```bash
npm run dev
```

Open http://localhost:5173 and you're good to go!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── LoginPage.jsx      # Google sign-in + guest mode
│   ├── CodeInput.jsx          # Code textarea
│   ├── ModeSelector.jsx       # 6 personality cards
│   ├── OutputPanel.jsx        # AI response + copy + PDF export
│   └── HistoryPanel.jsx       # Saved history with bulk PDF export
├── api/
│   └── gemini.js              # Groq API call
├── hooks/
│   └── useHistory.js          # Save + fetch + delete history
├── lib/
│   └── supabase.js            # Supabase client
├── prompts/
│   └── modes.js               # System prompts for all 6 modes
└── App.jsx                    # Main app + auth state
```

---

## 🔑 Environment Variables

| Variable | Where to get it |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `VITE_GROQ_API_KEY` | console.groq.com → API Keys |

---
Built with React, Groq, Supabase, and way too much fun. 🌿
```

