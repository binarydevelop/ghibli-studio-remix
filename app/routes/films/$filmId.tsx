import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getFilmById } from "~/api/film";
import { Film } from "~/types/film";
import invariant  from "tiny-invariant";
import styles from '../../tailwind.css'
import FilmBanner from "~/components/filmBanner";
import Description from "~/components/description";
import CharacterList from "~/components/characterList";

// stylesheet
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles}];
}

//Meta properties
export const meta: MetaFunction = ({data}) => {
    return {title: data.title , description: data.description}
}

export const loader: LoaderFunction = async ({params}) => {
    invariant(params.filmId, 'Expected a Film Id')
    const film = await getFilmById(params.filmId)
    return film
}
export default function FilmIndex(){
    const film = useLoaderData<Film>();
    return (
        <>
        <div>
            <FilmBanner film={film}/>
        </div>
        <div>
            <Description image={film.image} description={film.description} />
        </div>
        <div className="flex py-5 space-x-3 p-3">
            <CharacterList characters={film.characters}/>
            <div className="flex-1">
                <Outlet/>
            </div>
        </div>

        </>
    )

}