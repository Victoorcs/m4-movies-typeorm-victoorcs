import {z} from 'zod'

const movieSchema = z.object({
    id:z.number(),
    name:z.string().max(50),
    description:z.string().nullish(),
    duration:z.number().int().positive(),
    price:z.number().int().positive()
}) 

const movieSchemaRequest = movieSchema.omit({id:true})

const moviesSchemasResponse = z.array(movieSchema)

const updateSchemasRequest = movieSchemaRequest.partial()

export {movieSchema,movieSchemaRequest,moviesSchemasResponse,updateSchemasRequest}