import { Film } from "~/types/film";


export async function  getFilms(title?: string | null){
    const response = await fetch('https://ghibliapi.herokuapp.com/films')
    const films: Film[] = await response.json()

    if(title){
        return films.filter((film) => {
            return film.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
        })
    }
    return films
}

export async function getFilmById(filmId: string) {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`)

    const film: Film = await response.json();
    const characters = await Promise.all(
        film.people.filter((url) => {
            return url !== 'https://ghibliapi.herokuapp.com/people/'
        })
        .map(async (url) => {
            return await fetch(url).then((res) => res.json())
        })  
    )

    return {...film, characters}
}

export async function getCharacterById(characterId: string) {
    const response = await fetch( `https://ghibliapi.herokuapp.com/people/${characterId}`)
    if(!response.ok){
        throw response
    }
    return response.json()
}

