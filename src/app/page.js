"use client"
import Input_Recode from "@/components/input/input_recode";
import Select_recode from "@/components/select/select_recode";
import Image from 'next/image'
import { useState } from "react";

export default function Home() {
  const [paises, setPaises] = useState([
    { value: "Br", descricao: "Brasil" },
    { value: "Fr", descricao: "França" }
  ])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex w-1/2 p-10 bg-green-100 rounded-2xl gap-2 shadow-md">
        <div className="w-1/3">
          <Image src="/recode-jr-logo.png"
            alt="Logo da Recode"
            width={100}
            height={100} />
        </div>
        <div className="w-2/3">
          <h1 className="text-xl">Crie a sua conta</h1>
          <h3 className="text-lg">Preencha o formulário</h3>
          <Input_Recode labeltxt="Nome" />
          <Input_Recode labeltxt="E-mail" placeholder="Digite seu E-mail" />
          <Select_recode labeltxt="País" listaItens={paises}/>
        </div>
      </section>
    </main>
  );
}
