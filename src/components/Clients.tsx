import React, { useState, useEffect } from "react";
import api from "../services/api";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

interface Client {
  id: number;
  name: string;
}

interface NewClient {
  Name: string;
}

function Historic() {
  const [clients, setClients] = useState<Client[]>([]);
  const [newName, setNewName] = useState<NewClient>({ Name: "" });
  const [updateBox, setUpdateBox] = useState(false);
  const [idUPDT, setIdUPDT] = useState(0);

  useEffect(() => {
    setClients([]);
    loadClients();
  }, []);

  function loadClients() {
    const promise = api.get(`/api/client`);
    promise.then((response) => {
      const { data } = response;
      setClients(data);
    });
    promise.catch((err) => console.log(err.response));
  }

  function deleteClient(id: number) {
    const promise = api.delete(`/api/client/${id}`);
    promise.then(() => {
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
    });
    promise.catch((err) => console.log(err.response));
  }

  const handleButtonClick = (id: number) => {
    setUpdateBox(!updateBox);
    setIdUPDT(id);
  };


  function updateClient(e: React.FormEvent<HTMLFormElement>, id: number) {
    e.preventDefault();
    const promise = api.put(`/api/client/${id}`, newName);
    promise.then((res) => {
      setNewName({ Name: "" });
    });
    promise.catch((e) => {
      const message = e.response.data;
      setNewName({ Name: "" });
      alert(`Dados inválidos: ${message}`);
    });
  }

  return (
    <>
      <Main>
        <DivInfo>
          <h1>Aqui estão os cadastros anteriores!</h1>
          {clients.map((client) => {
            const { id, name } = client;
            return (
              <ClientBox key={id}>
                <Trash onClick={() => deleteClient(id)} />
                <Edit onClick={() => handleButtonClick(id)} />
                <h1>{name}</h1>
              </ClientBox>
            );
          })}
          {updateBox ? (
                  <form onSubmit={(e) => updateClient(e, idUPDT)}>
                    <Update
                      type="text"
                      placeholder="Nome"
                      onChange={(e) =>
                        setNewName({ ...newName, Name: e.target.value })
                      }
                      value={newName.Name}
                      required
                    />
                    <UpdateBT type="submit">Atualizar</UpdateBT>
                  </form>
                ) : (
                  <></>
                )}
        </DivInfo>
      </Main>
    </>
  );
}

export default Historic;

export const Main = styled.main`
  background-color: #efeef3;
  height: 100%;
  width: 535px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 70px;
`;

export const DivInfo = styled.div`
  width: 500px;
  height: 810px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  margin-left: 7px;
  margin-top: 40px;
  margin-right: 10px;

  h1 {
    font-family: millenial;
    font-size: 21px;
    margin-top: 100px;
  }
`;

export const ClientBox = styled.div`
  width: 350px;
  height: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: solid 1px gray;
  border-radius: 6px;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;

  h1 {
    font-family: oswald;
    font-size: 22px;
    font-weight: 500;
    position: absolute;
    bottom: 50px;
    left: 20px;
  }
`;

export const Trash = styled(BsTrash)`
  position: absolute;
  top: 10px;
  right: 15px;
  color: #030303;
  font-size: 17px;
  cursor: pointer;
`;

export const Edit = styled(AiFillEdit)`
  position: absolute;
  top: 10px;
  right: 45px;
  color: #030303;
  font-size: 17px;
  cursor: pointer;
`;

export const Update = styled.input`
  position: absolute;
  top: 260px;
  right: 50px;
  width: 429px;
  height: 65px;
  border: solid 2px red;
  border-radius: 6px;
  margin-bottom: 13px;
  font-size: 27px;
  font-family: oswald;
  padding-left: 17px;
  margin-bottom: 40px;

  input::placeholder {
    padding-left: 17px;
  }
`;

export const UpdateBT = styled.button`
  position: absolute;
  top: 330px;
  right: 50px;
  color: white;
  background-color: #1877f2;
  border: none;
  width: 429px;
  height: 65px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  font-family: oswald;
  cursor: pointer;
`;
