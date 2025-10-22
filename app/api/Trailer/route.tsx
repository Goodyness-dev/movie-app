
import { NextResponse } from "next/server";


export async function GET(req: Request){
 const {searchParams }=  new URL(req.url)
 const movieId= searchParams.get("movieId")


    if (!movieId) {
      return NextResponse.json({ error: "Missing movieId" }, { status: 400 });
    }
    const API_KEY = process.env.API_KEY!
    if(!API_KEY){

        return(NextResponse.json({error: "No api key"}, {status: 500}))
    }

    try{
        const res = await fetch(`https://api.themoviedb.org/3/movies/${movieId}/append_to_response=videos'`,
            {next: {revalidate: 3600}}
        )
        if (!res.ok){
             console.log("no response")
            return(NextResponse.json({error: "couldn't fetch trailer"}, {status: 400}))
        }

        const data = await res.json()
        return(NextResponse.json(data))
    }catch(err){
        console.error("Error fetching trailer:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}