"use client";
import { useState } from "react";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import { useAddActorToMovie } from "@/hooks/useMovies";
import { useActors } from "@/hooks/useActors";
import { Actor } from "@/types/actor";

interface AddActorToMovieDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
  currentActors: Actor[];
}

export default function AddActorToMovieDialog({
  isOpen,
  onClose,
  movieId,
  currentActors,
}: AddActorToMovieDialogProps) {
  const [selectedActorId, setSelectedActorId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: actorsData, isLoading } = useActors(currentPage);
  const addActorMutation = useAddActorToMovie(movieId);

  // Filtrar atores que já estão no filme
  const availableActors = actorsData?.actors.filter(
    (actor) => !currentActors.some((ca) => ca.id === actor.id)
  ) || [];

  const handleAdd = () => {
    if (!selectedActorId) {
      setError("Por favor, selecione um ator");
      return;
    }

    addActorMutation.mutate(selectedActorId, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error: any) => {
        setError(error?.response?.data?.message || "Erro ao adicionar ator");
      },
    });
  };

  const handleClose = () => {
    setSelectedActorId(null);
    setError("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Adicionar Ator ao Filme">
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-danger/10 border border-danger rounded-md">
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Selecione um Ator
          </label>

          {isLoading ? (
            <p className="text-secondary">Carregando atores...</p>
          ) : availableActors.length === 0 ? (
            <p className="text-secondary">Nenhum ator disponível para adicionar.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {availableActors.map((actor) => (
                <div
                  key={actor.id}
                  onClick={() => setSelectedActorId(actor.id)}
                  className={`
                    p-3 rounded-md border cursor-pointer transition-all
                    ${
                      selectedActorId === actor.id
                        ? "bg-primary/10 border-primary"
                        : "bg-muted border-secondary hover:border-primary"
                    }
                  `}
                >
                  <h4 className="font-semibold text-foreground">{actor.name}</h4>
                  <p className="text-sm text-secondary">
                    {new Date(actor.birthdate).toLocaleDateString("pt-BR")} •{" "}
                    {actor.gender === "M"
                      ? "Masculino"
                      : actor.gender === "F"
                      ? "Feminino"
                      : "Outro"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {actorsData && actorsData.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="px-4 py-2 text-foreground">
                {currentPage} / {actorsData.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(actorsData.totalPages, p + 1))}
                disabled={currentPage === actorsData.totalPages}
              >
                Próximo
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={addActorMutation.isPending || !selectedActorId}
          >
            {addActorMutation.isPending ? "Adicionando..." : "Adicionar"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}