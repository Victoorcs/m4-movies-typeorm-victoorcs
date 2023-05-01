
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { Request, Response, NextFunction } from 'express';


const ensureNameIsUniqueMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const moviesRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    const { name } = req.body
  
    const existingMovie = await moviesRepository.findOne({
      where: { name } 
    })
  
    if (existingMovie) {
      return res.status(409).json({ message: 'Movie already exists.' })
    }
  
    return next()
  }
  
  export default ensureNameIsUniqueMiddleware