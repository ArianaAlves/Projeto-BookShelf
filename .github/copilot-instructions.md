# Copilot Instructions for Projeto-BookShelf

## Project Overview

- **Frameworks:** Next.js 15, React 19, TypeScript, TailwindCSS v4, shadcn/ui
- **App Structure:**
  - Pages and routes are under `src/app/`
  - UI components in `src/components/`
  - Data and utility logic in `src/app/data/` and `src/app/lib/`
  - API routes in `src/app/api/`
  - Types in `src/types/`

## Key Patterns & Conventions

- **Routing:** Uses Next.js App Router (`src/app/[route]/page.tsx`). Dynamic routes use `[id]` folders.
- **Data Flow:**
  - Book data is managed in `src/app/data/books.ts` (static) and via API routes (`src/app/api/books/`).
  - CRUD operations use fetch calls to `/api/books/[id]`.
- **Components:**
  - UI is built with shadcn/ui and TailwindCSS.
  - Book-related UI: `BookCard`, `BookDetailsPage`, `BookForm`, `DeleteBookButton`, `FilterableBookList`.
- **State Management:**
  - Local state via React hooks (`useState`, `useRouter`).
  - No global state library detected.
- **Styling:**
  - TailwindCSS for utility classes.
  - Custom styles in `src/styles/tailwind.css`.

## Developer Workflows

- **Start Dev Server:**
  - `npm install` then `npm run dev`
- **Add/Edit Books:**
  - Use `/adicionar` for adding, `/books/[id]/edit` for editing.
- **Delete Books:**
  - Triggered via UI, calls API route with DELETE method.
- **API:**
  - All book/category API logic is in `src/app/api/`

## Project-Specific Notes

- **Images:**
  - Book covers are in `public/` and referenced by relative path.
- **Type Safety:**
  - Types for books in `src/types/book.ts`.
- **Design System:**
  - Theme and tokens in `src/components/design/`.

## Examples

- To display a book card:
  ```tsx
  <BookCard titulo="Hamlet" autor="William Shakespeare" capa="/hamlet.jpg" ... />
  ```
- To delete a book:
  ```ts
  fetch(`/api/books/${id}`, { method: "DELETE" });
  ```

## Integration Points

- No external database detected; data is static or handled via API routes.
- No authentication or user management present.

---

Update this file if major architectural changes are made. For questions, see `README.md` or ask the project owner.
