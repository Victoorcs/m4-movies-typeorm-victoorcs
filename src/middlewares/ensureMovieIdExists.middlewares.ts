import { Repository, getRepository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';

const ensureMovieIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const  id  = req.params.id
  
    const existingMovie = await moviesRepository.findOne({
      where: { id:Number(id) } 
    })
  
    if (!existingMovie) {
      throw new AppError("Movie not found",404)
    }
  
    return next()
  }
  
  export default ensureMovieIdExistsMiddleware