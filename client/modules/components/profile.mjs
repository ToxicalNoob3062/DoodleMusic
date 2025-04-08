const Profile = `
<div id="profile" class="flex flex-col sm:flex-row gap-4 p-3 rounded-lg bg-zinc-800 items-center mt-6">
  <img class="w-16 h-16 rounded-full" src="user.png"/>
  <div class="flex flex-col gap-1 text-white text-lg">
    <h2><span class="font-bold text-red-500">Username </span> {{user}}</h2>
    <p><span class="font-bold text-red-500">Role </span> {{role}}</p>
    <p><span class="font-bold text-red-500">Songs </span> {{total}}</p>
  </div>
  <div class="flex sm:flex-col flex-grow items-end gap-4 p-2 ">
    <button id="logout" class="bg-red-500 w-20 text-white rounded-md p-1 cursor-pointer">
        Logout
    </button>
    <button id="delete" class="bg-red-500 w-20 text-white rounded-md p-1 cursor-pointer">
        Delete
    </button>
  </div>
</div>
`;

export default Profile;
