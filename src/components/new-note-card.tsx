import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChanged(evt: ChangeEvent<HTMLTextAreaElement>) {
    setContent(evt.target.value);

    if (!evt.target.value.trim()) {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(evt: FormEvent) {
    evt.preventDefault();

    onNoteCreated(content);

    setContent("");
    setShouldShowOnBoarding(true);

    toast.success("Nota criada com sucesso");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col gap-3 text-left bg-slate-700 p-5 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 relative overflow-hidden">
        <div className="absolute right-0 top-0 p-1.5 bg-slate-800">
          <ArrowUpRight className="size-5 text-slate-600" />
        </div>
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50">
          <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>

            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Adicionar nota
                </span>
                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{" "}
                    <button className="font-medium text-lime-400 hover:underline">
                      gravando uma nota
                    </button>{" "}
                    em áudio ou se preferir{" "}
                    <button
                      className="font-medium text-lime-400 hover:underline"
                      onClick={handleStartEditor}
                    >
                      utilize apenas texto
                    </button>
                    .
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    value={content}
                    onChange={handleContentChanged}
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
