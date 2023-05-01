import { Router } from "express";
import { createMoviesController, deleteMovieController, listMoviesController, updateMoviesController } from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middelwares";
import { movieSchema, movieSchemaRequest, updateSchemasRequest } from "../schemas/movies.schemas";
import ensureNameIsUniqueMiddleware from "../middlewares/ensureMovieExists.middleware";
import ensureMovieIdExistsMiddleware from "../middlewares/ensureMovieIdExists.middlewares";

const moviesRoutes: Router = Router()

moviesRoutes.post('',ensureNameIsUniqueMiddleware,ensureDataIsValidMiddleware(movieSchemaRequest),createMoviesController)

moviesRoutes.get('',listMoviesController)

moviesRoutes.patch('/:id',ensureDataIsValidMiddleware(updateSchemasRequest),ensureMovieIdExistsMiddleware, updateMoviesController)

moviesRoutes.delete('/:id',deleteMovieController)

export default moviesRoutes