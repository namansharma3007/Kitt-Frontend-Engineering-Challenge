"use client";
import FlightsList from "@/components/FlightsList";
import NavBar from "@/components/NavBar";
import ResultsSearchBar from "@/components/ResultsSearchBar";
import {useState} from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  const [openTopSearchBar, setOpenTopSearchBar] = useState<boolean>(false);

  const openTab = useSelector((state: RootState) => state.openTab);


  return (
    <section className="w-screen flex flex-col h-max relative">
      <div className={`${openTab ? 'block' : 'hidden'} w-full h-full bg-black fixed top-0 left-0 z-20 opacity-20`}></div>
      <ResultsSearchBar openTopSearchBar={openTopSearchBar} setOpenTopSearchBar={setOpenTopSearchBar}/>
      <NavBar setOpenTopSearchBar={setOpenTopSearchBar}/>
      <FlightsList />
    </section>
  );
}

