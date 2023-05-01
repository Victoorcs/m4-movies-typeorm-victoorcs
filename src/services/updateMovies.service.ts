import { Repository } from "typeorm"
import { TMovies, TMoviesPagination, TMoviesRequest, TMoviesResponse, TMoviesUpdateRequest } from "../interfaces/movies.interface"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { movieSchema, moviesSchemasResponse } from "../schemas/movies.schemas"
import { AppError } from "../error"

const updateMoviesService = async (movieData:TMoviesUpdateRequest, movieId:number):Promise<TMovies> =>{

    const moviesRepository:Repository<Movie> = AppDataSource.getRepository(Movie)

    if(movieData.name){
        if(await moviesRepository.findOneBy({
            name: movieData.name
        })){
            throw new AppError("Movie already exists.",409)
        }
        
    }

    const oldMovieData:Movie | null = await moviesRepository.findOne({
        where: {id:movieId}
    })

    const newMovieData: Movie = moviesRepository.create({
        ...oldMovieData,
        ...movieData
    })
    
    await moviesRepository.save(newMovieData)

   const returnMovies: TMovies = movieSchema.parse(newMovieData)
   
    
    return returnMovies
}

export default updateMoviesService