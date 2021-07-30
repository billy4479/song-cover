import { createContext, createSignal, Component, useContext, Accessor } from 'solid-js';
import { Song } from './Models/Search';

const StoreContext = createContext();

export const StoreProvider: Component = (props) => {
    const [selectedSong, setSelectedSong] = createSignal<Song | null>(null);
    const [isSearching, setIsSearching] = createSignal(true);
    const store = { selectedSong: { selectedSong, setSelectedSong }, isSearching: { isSearching, setIsSearching } };

    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    );
}

interface Store {
    selectedSong: {
        selectedSong: Accessor<Song | null>;
        setSelectedSong: (v: Song | ((prev: Song | null) => Song | null) | null) => Song | null;
    };
    isSearching: {
        isSearching: Accessor<boolean>;
        setIsSearching: (v: boolean | ((prev: boolean) => boolean)) => boolean;
    };
}

export function useStore(): Store { return useContext(StoreContext) as Store; }
