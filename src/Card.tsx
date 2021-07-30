import { Component, createSignal, Show, createEffect } from "solid-js"
import { useStore } from "./Store"
import ResponseData from "./Models/Track";

const Card: Component = () => {

    const { isSearching, selectedSong } = useStore();
    const [selectedSongData, setSelectedSongData] = createSignal<ResponseData | null>(null);
    const [artists, setArtists] = createSignal('');

    createEffect(async () => {
        if (!isSearching.isSearching() || selectedSong.selectedSong() !== null) {
            await fetchResult(selectedSong.selectedSong()!.id);

            const a = selectedSongData()!.contributors;
            let tmp = '';
            for (let i = 0; i < a.length; i++) {
                tmp += a[i].name;
                if (a.length !== i + 1)
                    tmp += ", ";
            }
            setArtists(tmp);
        }
    });

    async function fetchResult(id: number) {
        setSelectedSongData(await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}`)
            .then((res) => {
                console.log('fetch');

                if (res.status == 200)
                    return res.json();
                throw `Invalid response: ${res.status}`;
            })
            .then((data) => {
                return data
            })
            .catch(err => { console.error(err); return null; }));
    }

    return (
        <Show when={!isSearching.isSearching() && selectedSongData() !== null}>
            <div class="bg-light-700 text-center m-auto mt-20 flex flex-col w-1/5 p-5 rounded-3xl">
                <img src={selectedSongData()?.album.cover_big} alt="cover"
                    class="rounded-3xl shadow-dark-900" />
                <p class="text-4xl font-extrabold pt-5">{selectedSongData()?.title}</p>
                <p class="text-4xl">{artists()}</p>
            </div>
        </Show>
    )
}

export default Card