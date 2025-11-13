"use client";
import { useState, FormEvent, useEffect } from "react";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useUpdateActor } from "@/hooks/useActors";
import { Actor } from "@/types/actor";

interface EditActorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  actor: Actor;
}

export default function EditActorDialog({ isOpen, onClose, actor }: EditActorDialogProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const updateActorMutation = useUpdateActor(actor.id);

  useEffect(() => {
    if (actor) {
      setName(actor.name);
      setBirthdate(actor.birthdate.split('T')[0]); // Format date for input
      setGender(actor.gender);
    }
  }, [actor]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const actorData = {
      name,
      birthdate,
      gender,
    };

    updateActorMutation.mutate(actorData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error: any) => {
        setError(error?.response?.data?.message || "Erro ao atualizar ator");
      },
    });
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Editar Ator">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger rounded-md">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <Input
            label="Nome"
            value={name}
            onChange={setName}
            placeholder="Digite o nome do ator"
            required
          />
          <Input
            label="Data de Nascimento"
            type="date"
            value={birthdate}
            onChange={setBirthdate}
            required
          />
          <Input
            label="Gênero"
            value={gender}
            onChange={setGender}
            placeholder="Digite o gênero (M/F/Outro)"
            required
          />

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {}}
              disabled={updateActorMutation.isPending}
            >
              {updateActorMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}