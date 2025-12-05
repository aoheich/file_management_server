import { addFile, searchFiles, getFileById, renameFile, deleteFile, moveFile, getStats } from "../services/file_service.js";

export const upload_File = async (request, response, next) => {
    
    try {
      const files = request.files
      const{ category = "default"} = request.body
  
      const result = await addFile(files, category)
      
      return response.status(200).send(result)

    } catch (err) {
      next(err);
    }
  };
  
export const get_All_Files = async (request, response, next) => {
    try {
        const {search = "", category = "", page = 1, limit = 10} = request.query
        const result = await searchFiles(search,category,page,limit)
        return response.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export const get_File_By_Id = async (request, response, next) => {
    try {
        const { id } = request.params
        const result = await getFileById(id)
        return response.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export const rename_File = async (request, response, next) => {
    try {
        const {id} = request.params
        const { newFileName } = request.body 
        const result = await renameFile(id, newFileName)
        return response.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export const delete_File = async (request, response, next) => {
    try {
        const { id } = request.params
        const result = await deleteFile(id)
        return response.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export const move_File = async (request, response, next) => {
    try {
        const { id } = request.params
        const { newCategory } = request.body
        const result = await moveFile(id, newCategory)
        return response.status(200).send(result)
    } catch (err) {
        next(err)
    }
}

export const get_Stats = async (request, response, next) => {
    try {
        const result = await getStats()
        return response.status(200).send(result)
    } catch (err) {
        next(err)
    }
}