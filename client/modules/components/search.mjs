export const Search = `
    <div id="search_bar" class="flex w-full gap-2 mt-12 mb-4">
        <input
            id="search_input"
            type="text"
            autocomplete="off"
            placeholder="Enter Song Title"
            class="p-2 outline-none rounded-md text-white bg-zinc-950 focus:border-2 focus:border-red-400 border border-zinc-700"
        />
        <button id="submit_btn" class="bg-red-500 w-20 text-white rounded-md p-1 cursor-pointer">
            Submit
        </button>
    </div>
`;

export default Search;
