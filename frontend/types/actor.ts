import { Movie } from "@/types/movie";

export interface Actor {
    id: number;
    name: string;
    birthdate: string;
    gender: string;
    movies: Movie[];
}