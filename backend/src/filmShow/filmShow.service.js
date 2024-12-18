import {
    FilmService
} from "../film/film.service.js";
import filmShowModel from "./filmShow.schema.js";

export class FilmShowService {
    static createFilmShow = async ({
        roomId,
        showTime,
        showDate,
        film
    }) => {
        // check showDate showtime  (Nhớ + thời lượng của phim)

        return await filmShowModel.create({
            roomId,
            showTime,
            showDate,
            film
        })
    };

    static getListFilmShowing = async () => {
        const filmShows = await filmShowModel.find({
            showDate: {
                $gte: new Date()
            }
        }).populate({
            path: 'film',
        }).lean();

        const uniqueFilms = [];

        filmShows.forEach(filmShow => {
            if (!uniqueFilms.some(film => film._id.toString() === filmShow.film._id.toString())) {
                uniqueFilms.push(filmShow.film);
            }
        });

        return uniqueFilms;
    };

    static getUpComingFilm = async () => {
        return await FilmService.getUpComingFilm()
    };

    static getFilmShowDates = async (filmId) => {
        const filmShows = await filmShowModel.find({
            film: filmId,
            showDate: {
                $gte: new Date()
            },
        }).select('showDate').lean();

        const arrayShowDates = filmShows.map(item => item.showDate);
        return arrayShowDates;
    }

    static getShowtimesByFilmIdAndDate = async (filmId, showdate) => {
        const selectedDate = new Date(showdate);
        if (isNaN(selectedDate.getTime())) {
            throw new Error("Invalid date format");
        }

        // Tạo khoảng thời gian UTC bắt đầu và kết thúc ngày
        const startOfDay = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0));
        const endOfDay = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 23, 59, 59, 999));


        const showtimes = await filmShowModel.find({
                film: filmId,
                showDate: {
                    $gte: startOfDay,
                    $lt: endOfDay,
                }
            })
            .select('showTime')
            .lean();

        const arrayShowTimes = showtimes.map(item => item.showTime);
        return arrayShowTimes;
    }
}