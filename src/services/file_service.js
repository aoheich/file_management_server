import path from "path"
import fs from "fs/promises"
import { randomUUID } from "crypto"


const json_path = path.join(process.cwd(), "data", "files.json")

export const loadFiles = async () => {

    const data = await fs.readFile(json_path, "utf8")
    return JSON.parse(data)
}

export const saveFiles = async (fileData) => {

    await fs.writeFile(json_path, JSON.stringify(fileData, null, 2))
};


export const addFile = async (files, category) => {
    const new_files = [];

    for (const file of files) {

        const tempPath = path.join(process.cwd(), "uploads", "default", file.filename)
        const categoryPath = path.join(process.cwd(), "uploads", category)

        await fs.mkdir(categoryPath, { recursive: true })

        const ext = path.extname(file.originalname)

        const storedName = `${randomUUID()}${ext}`
        const finalPath = path.join(categoryPath, storedName)

        await fs.rename(tempPath, finalPath)

        const metadata = {
            id: randomUUID(),
            originalName: file.originalname,
            storedName,
            size: file.size,
            mimetype: file.mimetype,
            category,
            uploadedAt: new Date().toISOString(),
        };

        const filesarray = await loadFiles()
        filesarray.push(metadata)
        await saveFiles(filesarray)
        new_files.push(metadata)
    }

    return new_files;
};

export const getFileById = async (id) => {
    const files = await loadFiles()
    const file = files.find((file) => file.id === id)
    if (!file) {
        return { msg: "No File Found" }
    }
    return file
}

export const renameFile = async (id, newName) => {
    const files = await loadFiles()
    const file = files.find((file) => file.id === id)

    if (!file) {
        return { msg: "No File Found" }
    }

    const ext = path.extname(file.storedName)
    const newStoredName = `${newName}${ext}`

    const oldPath = path.join(process.cwd, "uploads", file.category, file.storedName)
    const newPath = path.join(process.cwd, "uploads", file.category, file.newStoredName)
    
    await fs.rename(oldPath, newPath)

    file.storedName = newStoredName

    await saveFiles(files)

    return file
}

export const deleteFile = async (id) => {
    let files = await loadFiles()
    const file = files.find((file) => file.id === id)

    if (!file) {
        return { msg: "No File Found" }
    }
    const filePath = path.join(process.cwd, "uploads", file.category, file.storedName)
    await fs.unlink(filePath)

    files = files.filter((f) => f.id !== id)
    await saveFiles(files)

    return ({ msg: "File Deleted" })
}

export const moveFile = async (id, newCategory) => {
    const files = await loadFiles()
    const file = files.find((file) => file.id === id)

    if (!file) {
        return { msg: "No File Found" }
    }

    const filePath = path.join(process.cwd(), "uploads", file.category, file.storedName)
    const newPath = path.join(process.cwd(), "uploads", newCategory, file.storedName)

    await fs.mkdir(path.dirname(newPath), { recursive: true });

    await fs.rename(filePath, newPath)

    file.category = newCategory

    await saveFiles(files)

    return file
}

export const searchFiles = async (query = "", category = "", page = 1, limit = 10) => {

    // Initalizing to start values to prevent undefined and indexing error since i am using the same function to get all files too

    const files = await loadFiles()

    query = query.toLowerCase().trim()

    let filtered = files.filter(file => {
        const matchesQuery = query ? file.originalName.toLowerCase().includes(query) : true

        const matchesCategory = category ? file.category === category : true

        return matchesQuery && matchesCategory;
    });

    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedResults = filtered.slice(startIndex, endIndex)

    return {
        results: paginatedResults,
        pagination: {
            total,
            page,
            limit,
            totalPages
        }
    };
};


export const getStats = async () => {
    const files = await loadFiles()

    let total_files = files.length

    const total_size = files.reduce((acc, file) => {
        acc += file.size
        return acc
    }, 0)


    const category_count = files.reduce((acc, file) => {
        acc[file.category] = (acc[file.category] || 0) + 1
        return acc
    }, {})

    const file_type_count = files.reduce((acc, file) => {
        acc[file.mimetype] = (acc[file.mimetype] || 0) + 1
        return acc
    }, {})

    return {
        total_files,
        total_size,
        category_count,
        file_type_count
    }
} 