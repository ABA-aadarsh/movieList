const baseUrl="https://api.tvmaze.com"
export const movieList=async ()=>{
    const apiURL=baseUrl+"/search/shows?q=all"
    try{
        const res=await fetch(apiURL)
        if(res){
            const data=await res.json()
            const smallList = data.map(i=>{
                return {
                    id: i.show.id,
                    imageUrl: i.show.image?.medium || null,
                    rating: i.show.rating.average,
                    name: i.show.name
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