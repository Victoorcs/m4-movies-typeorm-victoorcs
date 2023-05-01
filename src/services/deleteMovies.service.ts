import { Repository } from "typeorm"
import { TMoviesPagination, TMoviesResponse } from "../interfaces/movies.interface"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { moviesSchemasResponse } from "../schemas/movies.schemas"
import { AppError } from "../error"



const deleteMovieService = async (movieId: number): Promise<void> => {
    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
  
    const movieToDelete: Movie | null = await moviesRepository.findOne({
      where: {id:movieId}
      
    })
  
    if (!movieToDelete) {
      throw new AppError('Movie not found')
    }
  
    await moviesRepository.remove(movieToDelete!)
  }
  
  export default deleteMovieService