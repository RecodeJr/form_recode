"use client"

import Input_Recode from "@/components/input/input_recode";
import Select_recode from "@/components/select/select_recode";
import Image from 'next/image'
import { useEffect, useState } from "react";

export default function Home() {
  // Inicializando os use state dos selects 
  const [paises, setPaises] = useState([{ value: "-1", descricao: "Selecione", uf: "" }])
  const [estados, setEstados] = useState([{ value: "-1", descricao: "Selecione", uf: "" }])
  const [municipios, setMunicipios] = useState([{ value: "-1", descricao: "Selecione" }])

  // Inicializando os use state dos selects SELECIONADOS
  const [pais, setPais] = useState("-1")
  const [estado, setEstado] = useState("-1")
  const [municipio, setMunicipio] = useState("-1")

  // Buscando os nomes dos países
  useEffect(() => {

    // Função para buscar os paises na api do IBGE
    async function getPaises() {
      await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/paises")
        .then(response => response.json())
        .then(data => {
          const listaAux = [{ value: "-1", descricao: "Selecione", uf: "" }]

          // Percorre o array de paises e adiciona na listaAux
          data.map(pais => {
            listaAux.push({ value: pais.id["M49"], descricao: pais.nome, uf: pais.id["ISO-ALPHA-3"] })
          })
          // Substitui a lista de paises do select
          setPaises(listaAux)
        })
    }

    // Chama a função getPaises
    getPaises()
  }, [])

  useEffect(() => {

    // Função para buscar os estados na api do IBGE
    async function getEstados(pais) {
      console.log(pais);
      // A API do IBGE só retorna os estados do Brasil, então se o pais for o Brasil, busca os estados
      if (pais === "76") {
        await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
          .then(response => response.json())
          .then(data => {
            const listaAux = [{ value: "-1", descricao: "Selecione", uf: "" }]
            data.map(estado => {
              listaAux.push({ value: estado.id, descricao: estado.nome, uf: estado.sigla })
            })
            setEstados(listaAux)
          })
      }
      else {
        setEstados([{ value: "-1", descricao: "Selecione", uf: "" }]) // Se o pais não for o Brasil, limpa os estados    }
      }
    }

    //Chama função getEstados
    getEstados(pais)
  }, [pais])

  useEffect(() => {
    // função para buscar os municipios na api do IBGE
    async function getMunicipios(estado) {
      // A API do IBGE só retorna os estados do Brasil, então se não houver valor, não está no brasil
      if (estado !== "-1") {
        await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
          .then(response => response.json())
          .then(data => {
            const listaAux = [{ value: "-1", descricao: "Selecione" }]
            data.map(municipio => {
              listaAux.push({ value: municipio.id, descricao: municipio.nome })
            })
            setMunicipios(listaAux)
          })
      }
      else {
        setMunicipios([{ value: "-1", descricao: "Selecione" }]) // Se o pais não for o Brasil, limpa os municipios
      }
    }
    // Chama função getMunicipios
    getMunicipios(estado)
  }, [estado])

  // Funções para atualizar os valores selecionados
  const handleChangePais = (e) => {
    setPais(e.target.value)
  }

  const handleChangeEstado = (e) => {
    setEstado(e.target.value)
  }

  const handleChangeMunicipio = (e) => {
    setMunicipio(e.target.value)
  }
  return (
    // OBS: Pessoal, não sou tão bom em estilização, então pode ser que eu não tenha feito da melhor forma.
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex min-w-fit bg-gray-200 rounded-2xl gap-2 shadow-md">
        <div className="w-1/3 h-auto rounded-l-2xl place-content-center bg-white">
          <Image src="/recode-jr-logo.png"
            className="m-auto"
            alt="Logo da Recode"
            width={200}
            height={200} />
        </div>
        <div className="grid w-2/3 p-6 gap-2">
          <div className="text-center">
            <h1 className="text-3xl">Crie a sua conta</h1>
            <h3 className="text-lg">Preencha o formulário</h3>
          </div>
          <Input_Recode labeltxt="Nome" />
          <Input_Recode labeltxt="E-mail" />
          <div className="flex w-full gap-2">
            <Select_recode labeltxt="País" value={pais} listaItens={paises} handleChange={handleChangePais} />
            <Select_recode labeltxt="Estado" listaItens={estados} handleChange={handleChangeEstado} />
          </div>
          <Select_recode labeltxt="Município" listaItens={municipios} handleChange={handleChangeMunicipio} />
        </div>
      </section>
    </main>
  );
}
