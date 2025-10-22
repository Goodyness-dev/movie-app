import { NextResponse } from "next/server";

export async function GET(req:Request) {

    const API_KEY= process.env.API_KEY!

    
    if(!API_KEY){
        return(NextResponse.json({error: "could'y get api key"}, {status: 500}))
    }

    try{
       const url =  `https://api.themoviedb.org/3/trending/movie/day`  
       
       const res = await fetch(url, {
        headers: {
            accept: 'application/json',
              'Authorization': `Bearer ${API_KEY}`
        }
       })
       if(!res.ok){
        return(NextResponse.json({error: "couldn't fetch movies"}, {status: res.status}))

       }

       const data = await res.json()
       if(!data){
        return(console.error("error fetching data"))
       }
       return (NextResponse.json(data))
    }catch(err){
        return(NextResponse.json({error: err}, {status: 500}))
    }
}