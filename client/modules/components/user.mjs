export const User = `
<tr class="user odd:bg-zinc-800 even:bg-zinc-900 hover:bg-zinc-700 text-white">
  <td class="p-2 rounded-l-lg">
    <div class="flex items-center gap-2">
      <span class="text-lg font-semibold text-white">{{user}}</span>
    </div>
  </td>
  <td class="p-2">{{role}}</td>
  <td class="rounded-r-lg">
    <div class="flex items-center justify-center text-red-400 p-2">
      <button id={{user}} class="promote cursor-pointer">Promote</button>
    </div>
  </td>
</tr>
`;

Handlebars.registerPartial("User", User);
export default User;
