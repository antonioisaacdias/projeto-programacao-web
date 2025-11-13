"use client";
import { useState, FormEvent } from "react";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCreateMovie } from "@/hooks/useMovies";

interface NewMovieDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewMovieDialog({ isOpen, onClose }: NewMovieDialogProps) {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [ageGroup, setAgeGroup] = useState("");

  const createMovieMutation = useCreateMovie();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const movieData = {
      title,
      releaseYear: parseInt(releaseYear, 10),
      genre,
      ageGroup: parseInt(ageGroup, 10),
    };

    createMovieMutation.mutate(movieData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error("Erro ao criar filme:", error);
      },
    });
  };

  const handleClose = () => {
    setTitle("");
    setReleaseYear("");
    setGenre("");
    setAgeGroup("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Adicionar Novo Filme">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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
              disabled={createMovieMutation.isPending}
            >
              {createMovieMutation.isPending ? "Adicionando..." : "Adicionar"}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}