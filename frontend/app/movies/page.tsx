"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMovies } from "@/hooks/useMovies";
import { Pagination } from "@/components/pagination";
import Button from "@/components/ui/Button";
import NewMovieDialog from "./components/NewMovieDialog";
import { Eye } from "lucide-react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, error } = useMovies(currentPage);
  const router = useRouter();

  const handleViewDetails = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Meus Filmes</h1>
        <div>
          <Button onClick={() => setIsDialogOpen(true)}>
            Adicionar Filme
          </Button>
        </div>
      </div>

      <div className="border border-secondary rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary">
              <th className="border border-secondary px-4 py-2 text-white">Título</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Ano de Lançamento</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Gênero</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Faixa Etária</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="border border-secondary px-4 py-8 text-center text-foreground">
                  Carregando filmes...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="border border-secondary px-4 py-8 text-center text-danger">
                  Erro ao carregar filmes: {error.message}
                </td>
              </tr>
            ) : !data || !data.movies || data.movies.length === 0 ? (
              <tr>
                <td colSpan={5} className="border border-secondary px-4 py-8 text-center text-foreground">
                  Nenhum filme encontrado. Clique em "Adicionar Filme" para começar.
                </td>
              </tr>
            ) : (
              data.movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-muted">
                  <td className="border border-secondary px-4 py-2">{movie.title}</td>
                  <td className="border border-secondary px-4 py-2 text-center">
                    {movie.releaseYear}
                  </td>
                  <td className="border border-secondary px-4 py-2 text-center">{movie.genre}</td>
                  <td className="border border-secondary px-4 py-2 text-center">
                    {movie.ageGroup}
                  </td>
                  <td className="border border-secondary px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <Button
                        variant="primary"
                        onClick={() => handleViewDetails(movie.id)}
                      >
                          <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
            totalItems={data.totalItems}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <NewMovieDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
