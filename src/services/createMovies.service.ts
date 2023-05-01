import { Repository } from "typeorm";
import { Movie } from "../entities";
import { TMoviesRequest } from "../interfaces/movies.interface";
import { AppDataSource } from "../data-source";


const createMoviesService = async (moviesData:TMoviesRequest):Promise <Movie> =>{
    
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie: Movie = movieRepository.create(moviesData)
    await movieRepository.save(movie)

    return movie
}

export default createMoviesService