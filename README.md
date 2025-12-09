# Rick and Morty Character Explorer

A web application to explore characters from the Rick and Morty TV series. Built with Next.js 15, Tailwind CSS, and Zustand as part of the Frontend Developer Assessment.

## Features

### Core Features

- **Character List**: Paginated grid view of characters with status indicators.
- **Search & Filter**: Search by name and filters for Status, Species, and Gender.
- **Detailed View**: Character details including origin, location, and episode appearances.
- **Responsive Design**: Layout adapts to mobile, tablet, and desktop devices.
- **Loading States**: Skeleton loaders during data fetching.
- **Error Handling**: Empty states and error messages.

### Bonus Features

- **Favorites System**: Persist favorite characters using LocalStorage.
- **Dark/Light Mode**: Theme toggling with system preference detection.
- **Animations**: Page transitions and list animations using Framer Motion.
- **Unit Testing**: Component tests implemented with Vitest and React Testing Library.
- **Episode Integration**: View episode details within the character profile.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with Persist middleware)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & React Testing Library

## Time Tracking

| Task                         | Time Spent  | Notes                                    |
| ---------------------------- | ----------- | ---------------------------------------- |
| **Setup & Config**           | 30m         | Next.js init, Tailwind v4, Shadcn setup  |
| **Core UI & Layout**         | 1h 30m      | Card components, Grid, Responsive Layout |
| **API & State**              | 1h          | TanStack Query setup, Zustand store      |
| **Features (Search/Filter)** | 1h 30m      | Debounced search, URL-sync filters       |
| **Detail Page & Episodes**   | 1h          | Dynamic routing, Episode fetching        |
| **Bonus (Dark Mode/Favs)**   | 1h          | Next-themes, LocalStorage persistence    |
| **Testing & Polish**         | 1h          | Vitest setup, Animations, Bug fixes      |
| **Total**                    | **~7h 30m** |                                          |

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rick-morty-characters-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Run tests**

   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Testing

Unit tests are implemented using Vitest. To run the test suite:

```bash
npm test
```

Currently covers:

- `CharacterCard`: Rendering and interaction logic.
- `SearchInput`: Debounce logic and state updates.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   ├── ui/           # Shadcn UI primitives
├── hooks/            # Custom hooks (useSearchQuery, etc.)
├── lib/              # Utilities (API client, utils)
├── store/            # Zustand state store
├── types/            # TypeScript definitions
└── test/             # Test setup and configuration
```

---

_Submitted for Transportech Frontend Developer Assessment_
