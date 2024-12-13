import express from "express";
import filmController from "./film.controller.js";

const router = express.Router();

router.post("", filmController.createFilm);
router.get("/:id/getFilmDetail", filmController.getFilmDetail);

export default router;
