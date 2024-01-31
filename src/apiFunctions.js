const baseUrl="https://api.tvmaze.com"
export const movieList=async ()=>{
    const apiURL=baseUrl+"/shows"
    try{
        const res=await fetch(apiURL)
        if(res){
            const data=await res.json()
            const smallList = data.map(i=>{
                return {
                    id: i.id,
                    imageUrl: i.image?.medium || null,
                    rating: i.rating.average,
                    name: i.name
                }
            })
            console.log(smallList)
            return smallList
        }
    }catch(error){
        console.log(error)
        return false
    }
    return false
}
export const movieData=async (id)=>{
    const apiURL=baseUrl+"/shows/"+id
    try{
        const res=await fetch(apiURL)
        if(res){
            const data=await res.json()
            return {
                name: data.name,
                language: data.language,
                rating: data.rating.average,
                imageUrlMedium : data.image.medium,
                imageUrlOriginal: data.image.original,
                summary: data.summary,
                genres: data.genres
            }
        }
    }catch(error){
        console.log(error)
        return false
    }
    return false
}
export const fetchCastData=async (id)=>{
    const apiURL=baseUrl+"/shows/"+id+"/cast"
    try{
        const res=await fetch(apiURL)
        if(res){
            const data=await res.json()
            const smallList = data.map(i=>{
                return {
                    name: i.person.name,
                    role: i.character.name,
                    imageUrl: i.person.image.medium || null
                }
            })
            return smallList
        }
    }catch(error){
        console.log(error)
        return false
    }
    return false 
}