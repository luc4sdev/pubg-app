import { SearchForm } from "@/components/SearchForm";
import Image from "next/image";

import logo from '@/../../public/pubg-logo.svg'
export default async function Home() {
  
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <Image src={logo} width={300} height={300} alt="PUBG logo" />
      <h1 className="text-2xl font-bold">Insira o seu username do PUBG</h1>
      <SearchForm />
    </div>
  );
}
