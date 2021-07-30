import { Component, Show, For, createSignal, createEffect } from "solid-js";
import ResponseData from "./Models/Search";
import { useStore } from "./Store";

const Results = (props: { text: string; }) => {

    const { selectedSong, isSearching } = useStore();
    const [response, setResponse] = createSignal<ResponseData | null>(null);
    createEffect(async () => {
        setResponse(await fetchResults(props.text));
    })

    async function fetchResults(search: string): Promise<ResponseData | null> {
        if (search === '')
            return null;

        return fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${encodeURI(search)}`)
            .then((res) => {
                console.log('fetch');

                if (res.status == 200)
                    return res.json();
                throw `Invalid response: ${res.status}`;
            })
            .then((data) => {
                return data
            })
            .catch(err => { console.error(err); return null; });
    }

    function select(e: Event) {
        const song = response()!.data[parseInt((e.target as HTMLLIElement).id)];
        selectedSong.setSelectedSong(song);
        isSearching.setIsSearching(false);
    }

    return (
        <Show when={isSearching.isSearching()}>
            <Show when={response() !== null}
                fallback={() => {
                    return <div class="text-light-100">
                        {props.text === '' ? '' : 'Loading...'}
                    </div>
                }
                }>
                <ul class="m-auto overflow-auto rounded-lg">
                    <For each={response()!.data}>{(r, i) =>
                        <li class="bg-gray-800 flex p-3 place-items-center hover:bg-gray-700 cursor-pointer"
                            onClick={select} id={i().toString()}
                        >
                            <img src={r.album.cover_small} alt="cover" class="w-7 h-7" />
                            <span class="text-light-100 pl-3"> {r.title_short} - {r.artist.name} </span>
                        </li>
                    }</For>
                </ul>
            </Show>
        </Show>
    )
}

export default Results;