const Player = `
  <div class="flex items-center gap-4 p-4 rounded-lg bg-zinc-800 text-white mt-4 shadow-md">
    <img src="{{cover}}" alt="{{title}} cover" class="w-20 h-20 rounded-md object-cover" />
    <div class="flex flex-col flex-grow">
      <h3 class="text-2xl font-semibold text-white">{{title}}</h3>
      <p class="text-red-400 text-lg">{{artist}}</p>
      <audio controls class="w-full mt-2" autoplay>
        <source src="{{preview}}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>

`;

export default Player;
