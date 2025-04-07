const Collection = `
    <table id="{{tName}}" class="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th class="text-left p-2 border-r border-slate-300">Song</th>
            <th class="text-left p-2 border-r border-slate-300">Artist</th>
            <th class="text-left p-2">Keys</th>
          </tr>
        </thead>
        <tbody>
          {{#each songs}}
          {{> Song}}
          {{/each}}
        </tbody>
    </table>
`;

export default Collection;
