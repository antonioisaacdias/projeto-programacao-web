"use client";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import { useRemoveActorFromMovie } from "@/hooks/useMovies";
import { Actor } from "@/types/actor";

interface RemoveActorFromMovieDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
  actor: Actor;
}

export default function RemoveActorFromMovieDialog({
  isOpen,
  onClose,
  movieId,
  actor,
}: RemoveActorFromMovieDialogProps) {
  const removeActorMutation = useRemoveActorFromMovie(movieId);

  const handleRemove = () => {
    removeActorMutation.mutate(actor.id, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error("Erro ao remover ator:", error);
      },
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Remover Ator do Filme">
      <div className="space-y-4">
        <p className="text-foreground">
          Tem certeza que deseja remover o ator{" "}
          <span className="font-bold text-primary">"{actor.name}"</span> deste
          filme?
        </p>
        <p className="text-sm text-secondary">
          Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleRemove}
            disabled={removeActorMutation.isPending}
          >
            {removeActorMutation.isPending ? "Removendo..." : "Remover"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}