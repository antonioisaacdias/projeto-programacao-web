"use client";
import { useState, FormEvent } from "react";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCreateActor } from "@/hooks/useActors";

interface NewActorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewActorDialog({ isOpen, onClose }: NewActorDialogProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const createActorMutation = useCreateActor();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const actorData = {
      name,
      birthdate,
      gender,
    };

    createActorMutation.mutate(actorData, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error("Erro ao criar ator:", error);
      },
    });
  };

  const handleClose = () => {
    setName("");
    setBirthdate("");
    setGender("");
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Adicionar Novo Ator">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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
            placeholder="Selecione a data de nascimento"
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
              disabled={createActorMutation.isPending}
            >
              {createActorMutation.isPending ? "Adicionando..." : "Adicionar"}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}