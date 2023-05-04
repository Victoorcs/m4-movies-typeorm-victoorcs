import { Request,Response } from "express";
import { TMovies, TMoviesPagination, TMoviesRequest, TMoviesResponse, TMoviesUpdateRequest } from "../interfaces/movies.interface";
import createMoviesService from "../services/createMovies.service";
import listMoviesService from "../services/listMovies.service";
import updateMoviesService from "../services/updateMovies.service";
import deleteMovieService from "../services/deleteMovies.service";

const createMoviesController = async (req:Request, res:Response): Promise<Response> =>{

    const moviesData:TMoviesRequest = req.body

    const newMovie = await createMoviesService(moviesData)

    return res.status(201).json(newMovie)
}


const listMoviesController = async (req: Request, res: Response) => {

    

    const movies = await listMoviesService(req)

    return res.status(200).json(movies)
}

const updateMoviesController = async (req:Request, res:Response): Promise<Response> =>{

    const movieData:TMoviesUpdateRequest = req.body

    const movieId: number = Number(req.params.id)

    const newMovieData: TMovies = await updateMoviesService(movieData,movieId)

    return res.status(200).json(newMovieData)
}


const deleteMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movieId: number = Number(req.params.id)
  
    await deleteMovieService(movieId)
  
    return res.status(204).json()
  }

export {createMoviesController,listMoviesController,updateMoviesController,deleteMovieController} 