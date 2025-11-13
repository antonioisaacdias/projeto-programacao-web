"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useActorDetails } from "@/hooks/useActors";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EditActorDialog from "@/app/actors/[id]/components/EditActorDialog";
import DeleteActorDialog from "@/app/actors/[id]/components/DeleteActorDialog";
import { ArrowLeft, Pencil, Trash2, Eye } from "lucide-react";

export default function ActorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: actor, isLoading, error } = useActorDetails(parseInt(id));
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewMovieDetails = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  if (isLoading) {
    return (
      <div className="p-12">
        <div className="text-foreground">Carregando detalhes do ator...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12">
        <div className="text-danger">Erro ao carregar ator: {error.message}</div>
        <Button variant="outline" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="p-12">
        <div className="text-foreground">Ator não encontrado.</div>
        <Button variant="outline" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="danger" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Deletar
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <h1 className="text-3xl font-bold text-foreground mb-6">
            {actor.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-secondary mb-2">
                Data de Nascimento
              </h3>
              <p className="text-foreground text-lg">
                {new Date(actor.birthdate).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary mb-2">
                Gênero
              </h3>
              <p className="text-foreground text-lg">
                {actor.gender === "M"
                  ? "Masculino"
                  : actor.gender === "F"
                  ? "Feminino"
                  : "Outro"}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Filmografia ({actor.movies?.length || 0})
          </h2>

          {!actor.movies || actor.movies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-secondary">
                Nenhum filme cadastrado para este ator.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actor.movies.map((movie) => (
                <div
                  key={movie.id}
                  className="p-4 bg-muted border border-secondary rounded-lg hover:border-primary transition-colors relative group"
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleViewMovieDetails(movie.id)}
                      className="p-1 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-md transition-all"
                      title="Ver detalhes do filme"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2">
                    {movie.title}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-secondary">
                      <span className="font-medium">Ano:</span>{" "}
                      {movie.releaseYear}
                    </p>
                    <p className="text-secondary">
                      <span className="font-medium">Gênero:</span>{" "}
                      {movie.genre}
                    </p>
                    <p className="text-secondary">
                      <span className="font-medium">Faixa Etária:</span>{" "}
                      {movie.ageGroup}+
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {actor && (
        <>
          <EditActorDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            actor={actor}
          />

          <DeleteActorDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            actor={actor}
          />
        </>
      )}
    </div>
  );
}