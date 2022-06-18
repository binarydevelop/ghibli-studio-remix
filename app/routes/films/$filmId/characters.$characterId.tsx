import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"
import { getCharacterById } from "~/api/film"
import IndividualCharacter from "~/components/character"
import { FilmCharacter } from "~/types/filmCharacter"

export const loader: LoaderFunction = ({params}) => {
    invariant(params.characterId, 'Expected a character Id')
    return getCharacterById(params.characterId)
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