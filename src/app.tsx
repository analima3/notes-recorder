import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <header>
        <img src={logo} alt="nlw expert" />
      </header>

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque as suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />

        <NoteCard
          note={{
            createdDate: new Date(2023, 5, 20),
            content: "new content card",
          }}
        />

        <NoteCard
          note={{
            createdDate: new Date(2023, 5, 20),
            content: "new content card",
          }}
        />
      </div>
    </div>
  );
}
