import { createSignal, Component } from "solid-js";
import Results from "./Results";
import { useStore } from "./Store";

const SearchBox: Component = () => {
    const { isSearching } = useStore()
    const [input, setInput] = createSignal('');
    let lastTimeout: number | null = null;

    function updateText(e: Event) {
        if (lastTimeout !== null)
            clearTimeout(lastTimeout);
        lastTimeout = setTimeout(() => {
            setInput((e.target as HTMLInputElement).value);
            lastTimeout = null;
            isSearching.setIsSearching(true);
        }, 1000);
    }

    return (
        <div class="text-center">
            <input type="text" placeholder="Search here..."
                class="bg-gray-700 text-light-100 rounded py-3 px-5 text-2xl m-3" onkeyup={updateText} />
            <Results text={input()} />
        </div>
    );
}

export default SearchBox;
