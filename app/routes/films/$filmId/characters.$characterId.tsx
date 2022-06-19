import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getCharacterById } from "~/api/film"
import IndividualCharacter from "~/components/character"
import { FilmCharacter } from "~/types/filmCharacter"

export const loader: LoaderFunction = ({params}) => {
    invariant(params.characterId, 'Expected a character Id')
    return getCharacterById(params.characterId)
}


//Meta properties
export const meta: MetaFunction = ({data}) => {
    console.log(data.name)

    return {title: data.name , description: data.id}
}

export default function Character(){
    const character = useLoaderData<FilmCharacter>();

    return( 
    <div className="p-5">
        <IndividualCharacter 
        id = {character.id} 
        name={character.name} 
        hair_color={character.hair_color} 
        eye_color={character.eye_color} 
        age={character.age} 
        gender={character.gender}/>
    </div>
    )
}


export function CatchBoundary() {
    const caught = useCatch();
  
    if (caught.status === 404) {
      return (
        <div className="mb-3">
          <div className="text-3xl mb-2">Details</div>
          <div className="p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {caught.statusText}
            </div>
            <p>
              {caught.status} {caught.statusText}
            </p>
          </div>
        </div>
      );
    }
  
    throw new Error('Unkown error');
  }

export function ErrorBoundary({ error }: any) {
    return (
      <div className="mb-3">
        <div className="text-3xl mb-2">Details</div>
        <div className="p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
          <div className="text-gray-700 font-bold text-xl mb-2">
            Uh oh... Sorry something went wrong!
          </div>
          <p>{error?.message}</p>
        </div>
      </div>
    );
  }

  
