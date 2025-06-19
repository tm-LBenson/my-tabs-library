(async () => {
  const toc = document.getElementById("toc");
  try {
    const res = await fetch("tabs/tabs.json");
    if (!res.ok) throw new Error("Could not load tabs/tabs.json");
    const files = await res.json();
    if (!files.length) {
      toc.innerHTML = '<li class="text-gray-500">No tabs found!</li>';
      return;
    }

    files.forEach((file) => {
      let name = file
        .replace(/\.html$/, "")
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");

      const li = document.createElement("li");
      li.className =
        "bg-gray-800 bg-opacity-50 p-4 rounded-lg hover:bg-opacity-75 transition";

      const a = document.createElement("a");
      a.href = `tabs/${file}`;
      a.textContent = name;
      a.className = "text-2xl font-semibold text-blue-400 hover:text-blue-200";

      li.appendChild(a);
      toc.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    toc.innerHTML = '<li class="text-red-500">Error loading tabs.</li>';
  }
})();
