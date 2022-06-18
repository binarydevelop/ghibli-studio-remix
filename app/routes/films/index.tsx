import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { Form, Link, useLoaderData } from "@remix-run/react"
import { getFilms } from "~/api/film"
import { Film } from "~/types/film"
import styles from '../../tailwind.css'

// stylesheet
export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles}];
}

//Meta properties
export const meta: MetaFunction = () => {
    return {title: 'Films' , description: 'Ghibli Studio'}
}

//Loader Function SERVER-SIDE
export const loader: LoaderFunction = async ({request}) => {
    const url = new URL(request.url)
    const title = url.searchParams.get('title')
    return getFilms(title);
}


// CLIENT-SIDE
export default function FilmsIndex(){
    const films: Film[] = useLoaderData();
    return (
<div className="p-10 font-sans"> 
    <h1 className="text-5xl font-bold text-center p-11">Studio Ghibli Films 🎬</h1>
    <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search{' '}
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Search
        </button>
      </Form>
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {films.map((film) => (
        <li key={film.id} className="relative">
          <Link key={film.id} to={film.id} className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden" >
            <img src={film.image} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
            <button type="button" className="absolute inset-0 focus:outline-none">
              <span className="sr-only">{film.title}</span>
            </button>
          </Link>
          <p className="mt-2 block text-sm font-serif text-gray-900 truncate pointer-events-none">{film.title}</p>
        </li>
      ))}
    </ul>
</div>
    )
}