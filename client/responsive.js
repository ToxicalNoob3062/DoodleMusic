const user = document.getElementById("user_container");
const playlist = document.getElementById("playlist_container");
const search = document.getElementById("search_container");

const mediaQuery = window.matchMedia("(max-width: 1799px)");

let leftBtn, rightBtn, leftCloseBtn, rightCloseBtn;

const applyMobileStyles = () => {
  // Convert side panels to absolute
  user.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "z-50",
    "h-full",
    "overflow-y-scroll",
    "transition-all",
    "duration-300",
    "w-0",
    "bg-zinc-900",
  );
  search.classList.add(
    "fixed",
    "top-0",
    "right-0",
    "z-50",
    "h-full",
    "overflow-y-scroll",
    "transition-all",
    "duration-300",
    "w-0",
    "bg-zinc-900",
  );

  playlist.classList.add("w-full"); // Middle panel should take full width
  user.style.width = "0";
  search.style.width = "0";
  user.style.padding = "0"; // Remove padding when closed
  search.style.padding = "0"; // Remove padding when closed

  // Inject hamburger buttons
  if (!leftBtn) {
    leftBtn = document.createElement("button");
    leftBtn.innerText = "☰";
    leftBtn.className =
      "fixed top-4 left-4 z-40 p-2 bg-zinc-700 text-white rounded";
    document.body.appendChild(leftBtn);
    leftBtn.addEventListener("click", () => togglePanel(user, search));

    // Create close button for left panel
    leftCloseBtn = document.createElement("button");
    leftCloseBtn.innerText = "×";
    leftCloseBtn.className =
      "absolute top-4 right-4 z-50 bg-red-500 w-8 h-8 text-xl flex justify-center items-center text-white rounded-full";
    leftCloseBtn.style.display = "none";
    user.appendChild(leftCloseBtn);
    leftCloseBtn.addEventListener("click", () => togglePanel(user, search));
  }

  if (!rightBtn) {
    rightBtn = document.createElement("button");
    rightBtn.innerText = "☰";
    rightBtn.className =
      "fixed top-4 right-4 z-40 p-2 bg-zinc-700 text-white rounded";
    document.body.appendChild(rightBtn);
    rightBtn.addEventListener("click", () => togglePanel(search, user));
  }

  // Create close button for right panel, ensure it appears on page load
  if (!rightCloseBtn) {
    rightCloseBtn = document.createElement("button");
    rightCloseBtn.innerText = "×";
    rightCloseBtn.className =
      "absolute top-4 right-4 z-50 bg-red-500 w-8 h-8 text-xl flex justify-center items-center text-white rounded-full";
    rightCloseBtn.style.display = "none";
    search.appendChild(rightCloseBtn);
    rightCloseBtn.addEventListener("click", () => togglePanel(search, user));
  }
};

const removeMobileStyles = () => {
  // Reset everything
  user.classList.remove(
    "fixed",
    "top-0",
    "left-0",
    "z-50",
    "h-full",
    "w-0",
    "bg-zinc-900",
    "transition-all",
    "duration-300",
  );
  search.classList.remove(
    "fixed",
    "top-0",
    "right-0",
    "z-50",
    "h-full",
    "w-0",
    "bg-zinc-900",
    "transition-all",
    "duration-300",
  );

  playlist.classList.remove("w-full"); // Reset width for the middle panel
  user.style.width = "";
  search.style.width = "";
  user.style.padding = ""; // Add padding back on larger breakpoints
  search.style.padding = ""; // Add padding back on larger breakpoints

  if (leftBtn) leftBtn.remove();
  if (rightBtn) rightBtn.remove();
  if (leftCloseBtn) leftCloseBtn.remove();
  if (rightCloseBtn) rightCloseBtn.remove();
  leftBtn = rightBtn = leftCloseBtn = rightCloseBtn = null;
};

const togglePanel = (panelToOpen, panelToClose) => {
  const isOpen = panelToOpen.style.width === "100%";
  if (isOpen) {
    panelToOpen.style.width = "0";
    panelToOpen.style.padding = "0"; // Remove padding when closed
    leftCloseBtn.style.display = "none";
    rightCloseBtn.style.display = "none";
  } else {
    panelToOpen.style.width = "100%";
    panelToOpen.style.padding = "1rem"; // Add padding back when opened
    leftCloseBtn.style.display = "block";
    rightCloseBtn.style.display = "block";
  }
  panelToClose.style.width = "0";
  panelToClose.style.padding = "0"; // Remove padding from closed panel
};

const handleResize = (e) => {
  if (e.matches) {
    applyMobileStyles();
  } else {
    removeMobileStyles();
  }
};

// Initial check
handleResize(mediaQuery);

// Listen to viewport changes
mediaQuery.addEventListener("change", handleResize);
