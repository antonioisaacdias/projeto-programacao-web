"use client";
import { useState, FormEvent, useEffect } from "react";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useUpdateMovie } from "@/hooks/useMovies";
import { Movie } from "@/types/movie";

interface EditMovieDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export default function EditMovieDialog({ isOpen, onClose, movie }: EditMovieDialogProps) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [error, setError] = useState("");

  const updateMovieMutation = useUpdateMovie(movie.id);

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setReleaseYear(movie.releaseYear.toString());
      setGenre(movie.genre);
      setAgeGroup(movie.ageGroup.toString());
    }
  }, [movie]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const movieData = {
      title,
      releaseYear: parseInt(releaseYear, 10),
      genre,
      ageGroup: parseInt(ageGroup, 10),
    };

    updateMovieMutation.mutate(movieData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error: any) => {
        setError(error?.response?.data?.message || "Erro ao atualizar filme");
      },
    });
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Editar Filme">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger rounded-md">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <Input
            label="Título"
            value={title}
            onChange={setTitle}
            placeholder="Digite o título do filme"
            required
          />
          <Input
            label="Ano de Lançamento"
            type="number"
            value={releaseYear}
            onChange={setReleaseYear}
            placeholder="Digite o ano de lançamento"
            required
          />
          <Input
            label="Gênero"
            value={genre}
            onChange={setGenre}
            placeholder="Digite o gênero do filme"
            required
          />
          <Input
            label="Faixa Etária"
            type="number"
            value={ageGroup}
            onChange={setAgeGroup}
            placeholder="Digite a faixa etária"
            required
          />

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {}}
              disabled={updateMovieMutation.isPending}
            >
              {updateMovieMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}