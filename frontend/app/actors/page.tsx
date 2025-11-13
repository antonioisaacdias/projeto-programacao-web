"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActors } from "@/hooks/useActors";
import { Pagination } from "@/components/pagination";
import Button from "@/components/ui/Button";
import NewActorDialog from "@/app/actors/components/NewActorDialog";
import { Eye } from "lucide-react";

export default function ActorsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, error } = useActors(currentPage);
  const router = useRouter();

  const handleViewDetails = (actorId: number) => {
    router.push(`/actors/${actorId}`);
  };

  return (
    <div className="p-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4">Meus Atores</h1>
        <div>
          <Button onClick={() => setIsDialogOpen(true)}>
            Adicionar Ator
          </Button>
        </div>
      </div>

      <div className="border border-secondary rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-primary">
              <th className="border border-secondary px-4 py-2 text-white">Nome</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Data de Nascimento</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Gênero</th>
              <th className="border border-secondary px-4 py-2 text-white text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="border border-secondary px-4 py-8 text-center text-foreground">
                  Carregando atores...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="border border-secondary px-4 py-8 text-center text-danger">
                  Erro ao carregar atores: {error.message}
                </td>
              </tr>
            ) : !data || !data.actors || data.actors.length === 0 ? (
              <tr>
                <td colSpan={4} className="border border-secondary px-4 py-8 text-center text-foreground">
                  Nenhum ator encontrado. Clique em "Adicionar Ator" para começar.
                </td>
              </tr>
            ) : (
              data.actors.map((actor) => (
                <tr key={actor.id} className="hover:bg-muted">
                  <td className="border border-secondary px-4 py-2">{actor.name}</td>
                  <td className="border border-secondary px-4 py-2 text-center">
                    {new Date(actor.birthdate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="border border-secondary px-4 py-2 text-center">
                    {actor.gender === 'M' ? 'Masculino' : actor.gender === 'F' ? 'Feminino' : 'Outro'}
                  </td>
                  <td className="border border-secondary px-4 py-2 text-center">
                    <div className="flex justify-center">
                      <Button
                        variant="primary"
                        onClick={() => handleViewDetails(actor.id)}
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

      <NewActorDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}