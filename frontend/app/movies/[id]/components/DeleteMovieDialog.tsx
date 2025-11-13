"use client";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import { useDeleteMovie } from "@/hooks/useMovies";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";

interface DeleteMovieDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export default function DeleteMovieDialog({ isOpen, onClose, movie }: DeleteMovieDialogProps) {
  const deleteMovieMutation = useDeleteMovie();
  const router = useRouter();

  const handleDelete = () => {
    deleteMovieMutation.mutate(movie.id, {
      onSuccess: () => {
        onClose();
        router.push("/movies");
      },
      onError: (error) => {
        console.error("Erro ao deletar filme:", error);
      },
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Deletar Filme">
      <div className="space-y-4">
        <p className="text-foreground">
          Tem certeza que deseja deletar o filme{" "}
          <span className="font-bold text-primary">"{movie.title}"</span>?
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
            onClick={handleDelete}
            disabled={deleteMovieMutation.isPending}
          >
            {deleteMovieMutation.isPending ? "Deletando..." : "Deletar"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}