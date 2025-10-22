import React, { useEffect, useRef, useState } from "react";
interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Search = ({ search, setSearch }: SearchProps) => {
   const [current, setCurrent]=useState("")
    const typingTimeout = useRef<NodeJS.Timeout| null>(null)

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=> {
      const value = e.target.value
      setCurrent(value)

      if(typingTimeout.current){
        clearTimeout(typingTimeout.current)
      }

      typingTimeout.current = setTimeout(()=> {
            setSearch(value)
      }, 1000)
      
    }
  return (
    <div className=" flex justify-center p-10">
      <input
        type="text"
        placeholder="Search movies..."
        value={current}
        onChange={handleChange}
        className=" bg-amber-50 text-black p-4 rounded-2xl w-1/2 outline-none"
      />     
    </div>
  );
};

export default Search;
