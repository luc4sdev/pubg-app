import { SearchForm } from "@/components/SearchForm";
import Image from "next/image";

import logo from '@/../../public/pubg-logo.svg'
import { Suspense } from "react";
import { Header } from "@/components/Header";

export default async function Home() {

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <Header />
      <Image src={logo} width={300} height={300} alt="PUBG logo" />
      <h1 className="text-2xl font-extrabold">Insira o seu username do PUBG</h1>
      <Suspense fallback={null}>
        <SearchForm />
      </Suspense>
    </div>
  );
}
