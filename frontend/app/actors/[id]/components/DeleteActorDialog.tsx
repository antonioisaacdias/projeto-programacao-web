"use client";
import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import { useDeleteActor } from "@/hooks/useActors";
import { useRouter } from "next/navigation";
import { Actor } from "@/types/actor";

interface DeleteActorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actor: Actor;
}

export default function DeleteActorDialog({ isOpen, onClose, actor }: DeleteActorDialogProps) {
  const deleteActorMutation = useDeleteActor();
  const router = useRouter();

  const handleDelete = () => {
    deleteActorMutation.mutate(actor.id, {
      onSuccess: () => {
        onClose();
        router.push("/actors");
      },
      onError: (error) => {
        console.error("Erro ao deletar ator:", error);
      },
    });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Deletar Ator">
      <div className="space-y-4">
        <p className="text-foreground">
          Tem certeza que deseja deletar o ator{" "}
          <span className="font-bold text-primary">"{actor.name}"</span>?
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
            disabled={deleteActorMutation.isPending}
          >
            {deleteActorMutation.isPending ? "Deletando..." : "Deletar"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}