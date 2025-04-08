const Player = `
  <div class="flex flex-col gap-4 justify-center gap-4 p-4 rounded-lg bg-zinc-800 text-white mt-4 shadow-md">
    <div class="flex gap-4 items-center">
      <img src="{{cover}}" alt="{{title}} cover" class="w-20 h-20 rounded-md object-cover" />
      <div>
        <h3 class="text-2xl font-semibold text-white">{{title}}</h3>
        <p class="text-red-400 text-lg">{{artist}}</p></div>
      </div>
    <audio controls class="w-full sm:w-1/2 mt-2" autoplay>
      <source src="{{preview}}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>

`;

export default Player;
