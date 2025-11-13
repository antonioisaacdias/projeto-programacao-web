import { Actor } from "@/types/actor";

export interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    genre: string;
    ageGroup: number;
    actors: Actor[];
}