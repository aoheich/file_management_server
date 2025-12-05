import { Router } from "express";
import { upload } from "../middlewares/upload.js"
import { uploadValidation, renameValidation, moveValidation } from "../validations/file_validation.js"
import { checkValidation } from "../middlewares/checkValidation.js"
import { delete_File, get_All_Files, get_File_By_Id, get_Stats, move_File, rename_File, upload_File } from "../controllers/file_controller.js";

const router = Router()

router.post("/upload", upload.array("files", 5), uploadValidation,  checkValidation, upload_File)

router.get("/files", get_All_Files)

router.get("/files/stat", get_Stats)

router.get("/files/:id", get_File_By_Id)

router.patch("/files/rename/:id", renameValidation, checkValidation, rename_File)

router.patch("/files/move/:id", moveValidation, checkValidation, move_File)

router.delete("/files/:id", delete_File)





export default router