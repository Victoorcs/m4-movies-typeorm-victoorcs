import { Repository } from "typeorm"
import { TMoviesPagination, TMoviesResponse } from "../interfaces/movies.interface"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { moviesSchemasResponse } from "../schemas/movies.schemas"



const listMoviesService = async (page: number | undefined, perPage: number | undefined, order: string = 'asc', sort: string = 'id'): Promise<TMoviesPagination> =>{

    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    let movies: Movie[] | undefined
    let count: number = 0
    let prevPage: string | null = null

   
    const validPage = Number.isInteger(page) && page! > 0 ? page : 1

    
    const validPerPage = Number.isInteger(perPage) && perPage! > 0 && perPage! <= 5 ? perPage : 5

    if(validPage && validPerPage){
        const skip = (validPage-1) * validPerPage
        movies = await moviesRepository.find({
            skip,
            take: validPerPage,
            order: {
                [sort]: order.toLowerCase() === 'desc' ? 'DESC' : 'ASC' 
            }
        })
        count = await moviesRepository.count()
        prevPage = validPage > 1 ? `/movies?page=${validPage - 1}&perPage=${validPerPage}&order=${order}&sort=${sort}` : null
    } else {
        movies = await moviesRepository.find()
        count = await moviesRepository.count()
    }

    const returnMovies: TMoviesResponse = moviesSchemasResponse.parse(movies)

    return {
        page: validPage || null,
        perPage: validPerPage || null,
        prevPage,
        nextPage: validPage && validPerPage && count > validPage * validPerPage ? `/movies?page=${validPage + 1}&perPage=${validPerPage}&order=${order}&sort=${sort}` : null,
        count,
        data: returnMovies
    }
}
export default listMoviesService