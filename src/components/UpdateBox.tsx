import React, { useState } from "react";
import api from "../services/api";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

interface UpdateClientProps {
  id: number;
  onUpdate: () => void;
}

const UpdateClient: React.FC<UpdateClientProps> = ({ id, onUpdate }) => {
  const [newName, setNewName] = useState("");

  const updateClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedClient = {
      id: id,
      name: formData.get("Name") as string,
    };

    api
      .put(`/api/client/${id}`, updatedClient)
      .then(() => {
        setNewName("");
        onUpdate();
      })
      .catch((err) => {
        const message = err.response.data;
        setNewName("");
        alert(`Dados inválidos: ${message}`);
      });
  };

  return (
    <form onSubmit={updateClient}>
      <Close onClick={onUpdate} />
      <input
        type="text"
        name="Name"
        placeholder="Nome"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        required
      />
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default UpdateClient;

const Close = styled(AiFillCloseCircle)`
  position: absolute;
  top: 10px;
  right: 45px;
  color: #030303;
  font-size: 17px;
  cursor: pointer;
  z-index: 2;
`;
