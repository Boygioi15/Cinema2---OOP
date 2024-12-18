import expressAsyncHandler from "express-async-handler";
import {
    FilmService
} from "./film.service.js";


class FilmController {


    createFilm = expressAsyncHandler(async (req, res, next) => {
        const response = await FilmService.createFilm(req.body)
        return res.status(200).json({
            msg: "Create film successfully!",
            success: true,
            data: response
        });
    });

}

export default new FilmController()