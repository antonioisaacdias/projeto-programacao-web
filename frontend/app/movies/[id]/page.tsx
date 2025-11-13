"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useMovieDetails } from "@/hooks/useMovies";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EditMovieDialog from "@/app/movies/[id]/components/EditMovieDialog";
import DeleteMovieDialog from "@/app/movies/[id]/components/DeleteMovieDialog";
import AddActorToMovieDialog from "@/app/movies/[id]/components/AddActorToMovieDialog";
import RemoveActorFromMovieDialog from "@/app/movies/[id]/components/RemoveActorFromMovieDialog";
import { ArrowLeft, Pencil, Trash2, UserPlus, X, Eye } from "lucide-react";
import { Actor } from "@/types/actor";

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: movie, isLoading, error } = useMovieDetails(parseInt(id));
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddActorDialogOpen, setIsAddActorDialogOpen] = useState(false);
  const [isRemoveActorDialogOpen, setIsRemoveActorDialogOpen] = useState(false);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);

  const handleRemoveActor = (actor: Actor) => {
    setSelectedActor(actor);
    setIsRemoveActorDialogOpen(true);
  };

  const handleViewActorDetails = (actorId: number) => {
    router.push(`/actors/${actorId}`);
  };

  if (isLoading) {
    return (
      <div className="p-12">
        <div className="text-foreground">Carregando detalhes do filme...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12">
        <div className="text-danger">Erro ao carregar filme: {error.message}</div>
        <Button variant="outline" onClick={() => router.back()}>
          Voltar
        </Button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="p-12">
        <div className="text-foreground">Filme não encontrado.</div>
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
            {movie.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-secondary mb-2">
                Ano de Lançamento
              </h3>
              <p className="text-foreground text-lg">{movie.releaseYear}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary mb-2">
                Gênero
              </h3>
              <p className="text-foreground text-lg">{movie.genre}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary mb-2">
                Faixa Etária
              </h3>
              <p className="text-foreground text-lg">{movie.ageGroup}+</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">
              Elenco ({movie.actors?.length || 0})
            </h2>
            <Button variant="primary" onClick={() => setIsAddActorDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Ator
            </Button>
          </div>

          {!movie.actors || movie.actors.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-secondary">
                Nenhum ator cadastrado para este filme.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movie.actors.map((actor) => (
                <div
                  key={actor.id}
                  className="p-4 bg-muted border border-secondary rounded-lg hover:border-primary transition-colors relative group"
                >
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleViewActorDetails(actor.id)}
                      className="p-1 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-md transition-all"
                      title="Ver detalhes do ator"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveActor(actor)}
                      className="p-1 bg-danger/10 hover:bg-danger hover:text-white text-danger rounded-md transition-all"
                      title="Remover ator"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2">
                    {actor.name}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-secondary">
                      <span className="font-medium">Nascimento:</span>{" "}
                      {new Date(actor.birthdate).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-secondary">
                      <span className="font-medium">Gênero:</span>{" "}
                      {actor.gender === "M"
                        ? "Masculino"
                        : actor.gender === "F"
                        ? "Feminino"
                        : "Outro"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {movie && (
        <>
          <EditMovieDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            movie={movie}
          />

          <DeleteMovieDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            movie={movie}
          />

          <AddActorToMovieDialog
            isOpen={isAddActorDialogOpen}
            onClose={() => setIsAddActorDialogOpen(false)}
            movieId={movie.id}
            currentActors={movie.actors || []}
          />

          {selectedActor && (
            <RemoveActorFromMovieDialog
              isOpen={isRemoveActorDialogOpen}
              onClose={() => {
                setIsRemoveActorDialogOpen(false);
                setSelectedActor(null);
              }}
              movieId={movie.id}
              actor={selectedActor}
            />
          )}
        </>
      )}
    </div>
  );
}