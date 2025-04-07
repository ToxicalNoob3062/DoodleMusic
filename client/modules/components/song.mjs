export const Song = `
    <tr class="odd:bg-zinc-800 even:bg-zinc-900 hover:bg-zinc-700 text-white">
        <td class="p-2 rounded-l-lg">
        <div class="flex gap-2 items-center">
            <img
            class="w-10 h-10 rounded-lg"
            src="{{cover}}"
            alt="{{title}}"
            />
            <h4>{{title}}</h4>
        </div>
        </td>
        <td class="p-2">{{artist}}</td>
        <td class="rounded-r-lg">
        <div id="{{id}}" class="flex gap-3 p-2 items-center justify-around text-red-400">
            {{#if inPlist}}
            <button class="remove text-xl font-extrabold cursor-pointer">−</button>
            <button class="up cursor-pointer">▲</button>
            <button class="down cursor-pointer">▼</button>
            {{else}}
            <button class="add text-xl font-extrabold cursor-pointer">+</button>
            {{/if}}
        </div>
        </td>
    </tr>
`;

Handlebars.registerPartial("Song", Song);

export default Song;
