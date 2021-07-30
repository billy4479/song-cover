import type { Component } from "solid-js";
import SearchBox from "./SearchBox";
import { StoreProvider } from "./Store";
import Card from './Card'

const App: Component = () => {
  return (
    <StoreProvider>
      <h1 class="text-6xl text-green-700 text-center py-15">Song Cover</h1>
      <SearchBox />
      <Card />
    </StoreProvider>
  );
};

export default App;
