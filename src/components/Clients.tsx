import React, { useState, useEffect } from "react";
import api from "../services/api";
import styled from "styled-components";
import { BsTrash } from "react-icons/bs";

interface Client {
  id: number;
  name: string;
}

function Historic() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  function loadClients() {
    const promise = api.get(`/`);
    promise.then((response) => {
      const { data } = response;
      setClients(data);
    });
    promise.catch((err) => console.log(err.response));
  }

  function deleteClient(id: number) {
    const promise = api.delete(`/client/${id}`);
    promise.then(() => {
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
    });
    promise.catch((err) => console.log(err.response));
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
                <h1>{name}</h1>
              </ClientBox>
            );
          })}
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
  width: 600px;
  height: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: solid 1px gray;
  border-radius: 6px;
  margin-bottom: 20px;
  position: relative;

  h1 {
    font-family: oswald;
    font-size: 20px;
    font-weight: 500;
    position: absolute;
    top: 11px;
    left: 22px;
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
