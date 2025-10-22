"use client";
import React, { useState, useEffect } from "react";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Movies = ({ search, setSearch }: SearchProps) => {
  interface MovieApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }

  interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    media_type: string;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

  const [movies, setMovies] = useState<MovieApiResponse | null>(null);
  const [TrailerKey, setTrailerKey] = useState<string | null>(null);

  // 🔹 Fetch movies
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`/api/movies?movie=${search}`);
        if (!res.ok) {
          console.error("Couldn't get movies from API");
          return;
        }
        const data = await res.json();
        console.log(data);
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    }

    if (search) {
      fetchMovies();
    }
  }, [search]);

  // 🔹 Move this OUTSIDE of useEffect
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies?.results.map((movie) => (
        <div
          key={movie.id}
          className="group bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-zinc-700 transition-all duration-300 cursor-pointer"
        >
          <div className="relative aspect-[2/3] overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-60" />
          </div>

          <div className="p-5">
            <p className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
              {movie.title}
            </p>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mt-2">
              {movie.overview}
            </p>
            

              
                <div className="flex items-start justify-between mb-3">
      <p className='text-gray-400'> Release Date: {movie.release_date}</p>
      <p className='text-gray-400'> Total Votes: {movie.vote_count}</p>
      </div>
    

          
          </div>
        </div>
      ))}

     
    </div>
  );
};

export default Movies;
