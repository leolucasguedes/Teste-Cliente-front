import React, { useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import Button from "./Button";

interface Client {
  Name: string;
}

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client>({ Name: "" });

  function postClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const promise = api.post("/api/client", client);
    promise.then((res) => {
      setClient({ Name: "" });
      setLoading(false);
    });
    promise.catch((e) => {
      const message = e.response.data;
      setClient({ Name: "" });
      setLoading(false);
      alert(`Dados inválidos: ${message}`);
    });
  }
  return (
    <Main>
      <form onSubmit={postClient}>
        <h1>Cadastre-se!</h1>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setClient({ ...client, Name: e.target.value })}
          value={client.Name}
          required
        />
        <Button loading={loading} />
      </form>
    </Main>
  );
}

export default SignUp;

const Main = styled.div`
  background-color: #efeef3;
  height: 100%;
  width: 535px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 170px;
  h1 {
    color: #000000;
    font-size: 46px;
    font-family: millenial;
    position: absolute;
    top: 210px;
    right: 150px;
  }
  form {
    display: flex;
    margin-top: 40px;
    flex-direction: column;
  }
  input {
    width: 429px;
    height: 65px;
    border: none;
    border-radius: 6px;
    margin-bottom: 13px;
    font-size: 27px;
    font-family: oswald;
    padding-left: 17px;
    margin-bottom: 40px;
  }
  input::placeholder {
    padding-left: 17px;
  }
  button {
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
  }
  .loading {
    animation: is-rotating 1s infinite;
    width: 25px;
    height: 25px;
    border: 4px solid #1877f2;
    border-top-color: #ffffff;
    border-radius: 50%;
    margin: 15px;
  }
  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    .form-box {
      position: relative;
      width: 100%;
      align-items: baseline;
      form {
        margin-top: 40px;
      }
      input {
        width: 330px;
        height: 55px;
        font-size: 22px;
      }
      button {
        width: 330px;
        height: 55px;
        font-size: 22px;
      }
    }
  }
`;
