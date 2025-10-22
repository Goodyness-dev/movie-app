import { NextResponse } from "next/server";


export async function GET(req: Request){

    const {searchParams}= new URL(req.url)
    const movie = searchParams.get("movie")?.toLowerCase()
    if (!movie)
        return(NextResponse.json({error: "couldnt get movie"},{status: 500}))
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}`
  const API_KEY = process.env.API_KEY!

  if(!API_KEY){
    return(NextResponse.json({error: "could not get api key"}, {status: 500}))
  }
    try{
        const res = await fetch(url, {
            headers: {
              accept: 'application/json',
              'Authorization': `Bearer ${API_KEY}`

            }
            
        })
        if(!res.ok){
            return NextResponse.json({error: "error getting them movies"}, {status: res.status})
        }
        const data = await res.json()
        return NextResponse.json(data)

    }catch(err){
        return(NextResponse.json({error: err}))
    }

    
}