import { Repository } from "typeorm"
import { TMoviesPagination, TMoviesResponse } from "../interfaces/movies.interface"
import { Movie } from "../entities"
import { AppDataSource } from "../data-source"
import { moviesSchemasResponse } from "../schemas/movies.schemas"
import { Request } from "express"



const listMoviesService = async ( req:Request): Promise<TMoviesPagination> =>{

    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    let page: number = Number(req.query.page) || 1
    let order: string = req.query.order === "DESC" || req.query.order === "desc" ? req.query.order.toUpperCase() : "ASC"
    let sort:string = String(req.query.sort) || 'id'
    let perPage: number = Number(req.query.perPage) || 5
    let movies: Movie[] 
    let count: number = 0
    let prevPage: string | null = null

    
      if(perPage < 1 || perPage > 5 || perPage < 0) {perPage = 5}
      if (page < 1 || page < 0) {page = 1}
      if (sort !== "price" && sort !== "duration") {sort = "id"; order = "ASC"}

      
        movies = await moviesRepository.find({
            skip:perPage * (page - 1),
            take: perPage,
            order: {
                [sort]: order
            }
        })
        
        count = await moviesRepository.count()
        prevPage = page === 1 ? null: `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}` 

    const returnMovies: TMoviesResponse = moviesSchemasResponse.parse(movies)

    let newNextPage: string | null = `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}` || null
        if(movies.length < perPage) {
        newNextPage = null;
        }

    return {
        
        prevPage,
        nextPage:  newNextPage,
        count,
        data: [...returnMovies]
    }
}



export default listMoviesService