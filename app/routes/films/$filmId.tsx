import { ActionFunction, LinksFunction, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getFilmById } from "../../api/film";
import { Film } from "../../types/film";
import invariant  from "tiny-invariant";
import styles from '../../tailwind.css'
import FilmBanner from "../../components/filmBanner";
import Description from "../../components/description";
import CharacterList from "../../components/characterList";
import CommentsList from "../../components/comment";
import { addComment } from "../../api/comment";

// stylesheet
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles}];
}

export const action: ActionFunction = async ({request, params}) => {
    invariant(params.filmId, 'expected params.filmId');
    const body = await request.formData();
  
    const comment = { 
      name: body.get('name') as string,
      message: body.get('message') as string,
      filmId: params.filmId
    }
  
    const errors = {name: '', message: ''};
  
    if (!comment.name) {
      errors.name = 'Please provide your name';
    }
  
    if (!comment.message) {
      errors.message = 'Please provide a comment';
    }
  
    if (errors.name || errors.message) {
      const values = Object.fromEntries(body);
      return { errors, values }; 
    }
  
    await addComment(comment);
  
    return redirect(`/films/${params.filmId}`);
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
            <div className="flex-1 flex flex-col justify-between">
            <Outlet/>
                <CommentsList filmId={film.id} comments = {film.comments || []}/>
            </div>
        </div>

        </>
    )

}