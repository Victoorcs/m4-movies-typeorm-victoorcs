import {z} from 'zod'
import { movieSchema,movieSchemaRequest, moviesSchemasResponse } from '../schemas/movies.schemas' 
import { DeepPartial } from 'typeorm'

type TMovies = z.infer<typeof movieSchema>

type TMoviesRequest = z.infer<typeof movieSchemaRequest>

type TMoviesResponse = z.infer<typeof moviesSchemasResponse>

type TMoviesPagination = {
  
    prevPage: string | null;
    nextPage: string | null;
    count: number;
    data:TMoviesResponse;

}

type TMoviesUpdateRequest = DeepPartial<TMoviesRequest>

export{TMovies,TMoviesRequest,TMoviesResponse,TMoviesPagination,TMoviesUpdateRequest}



