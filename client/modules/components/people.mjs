export const People = `
<table id="{{tName}}" class="w-full border-separate border-spacing-y-2 mt-4">
  <thead>
    <tr>
      <th class="text-left p-2 border-r border-slate-300">Name</th>
      <th class="text-left p-2 border-r border-slate-300">Role</th>
      <th class="text-left p-2">Key</th>
    </tr>
  </thead>
  <tbody>
    {{#each users}}
      {{> User}}
    {{/each}}
  </tbody>
</table>
`;

export default People;
