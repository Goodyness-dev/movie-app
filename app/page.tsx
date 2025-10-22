"use client"
import Image from "next/image";
import { useState } from "react";
import Search from "./Components/Search";
import TrendingMovies from "./Components/trendingMovies";
import Movies from "./Components/movies";
export default function Home() {
  const [search, setSearch] = useState<string>("")
  return (
   <div className="p-5 bg-black">
    <h1 className="text-black"> Movie app</h1>

    <Search search={search} setSearch={setSearch}/>
    <Movies search={search} setSearch={setSearch}/>
    <TrendingMovies/>
    
    
   </div>
  );
}
