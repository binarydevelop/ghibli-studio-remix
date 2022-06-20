import { FilmCharacter } from "~/types/filmCharacter";

export default function IndividualCharacter({id , eye_color, age, name, gender, hair_color }: FilmCharacter) {
return (
<>
<div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-7">
<div className="flex justify-end px-4 pt-4">


<div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">

</div>
</div>
<div className="flex flex-col items-center pb-10">
<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
<span className="text-sm text-gray-500 dark:text-gray-400">Age: {age}</span>
<span className="text-sm text-gray-500 dark:text-gray-400">Gender: {gender}</span>
<span className="text-sm text-gray-500 dark:text-gray-400">Eye Color: {eye_color}</span>
<span className="text-sm text-gray-500 dark:text-gray-400">Hair Color: {hair_color}</span>
<div className="flex mt-4 space-x-3 lg:mt-6">
</div>
</div>
</div>
</>
)
}