import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies]= useState<MovieApiResponse| null>(null)
    const [loading, setLoading]= useState(false)

  interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

    interface Movie {
  adult: boolean;
  backdrop_path: string | null; // null if missing
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null; // also sometimes null
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

    useEffect(()=> {
        async function fecthTrending() {

            try{
                     const res = await fetch('/api/TrendingMovies')
             if (!res.ok) {
          console.error("Couldn't get movies from API");
}

          const data = await res.json()
          console.log(data)
          setTrendingMovies(data)
        

            }catch(err: any){
                console.error(err.message)
            }finally{
                setLoading(true)
            }
       
        }
        fecthTrending()
    },[])
 
    return (
      <div>
   <h1 className='text-5xl text-white p-10'> Trending Movies... </h1>
  
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'> 
    {trendingMovies?.results.map((movie)=> (
    <div key={movie.id} className='group bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-zinc-700 transition-all duration-300 hover: outline-none cursor-pointer' >
     <div className='relative aspect-[2/3] overflow-hidden'>
      <img key={movie.id}  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/>
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-60" />
                      </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
      <p className='text-xl font-bold text-white group-hover:text-amber-400 transition-colors'>{movie.title}</p>
       <p className='text-gray-400'>Rating: {movie.vote_average.toFixed(2)}</p>
     
      </div>
      </div>
       <div className="p-5">
                
      <p className='text-gray-400 text-sm leading-relaxed line-clamp-3'>{movie.overview}</p>
      </div>
       <div className="p-5">
                <div className="flex items-start justify-between mb-3">
      <p className='text-gray-400'> Release Date: {movie.release_date}</p>
      <p className='text-gray-400'> Total Votes: {movie.vote_count}</p>
      </div>
      </div>
      </div>
    ))}
    
    </div>
    </div>
  );
}

export default TrendingMovies;
