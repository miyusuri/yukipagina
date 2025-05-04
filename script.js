const user = "miyusuri";
const repo = "yukipagina";
const branch = "main";

const counterEl = document.getElementById("counter");

async function fetchLastCommitDate() {
    const response = await fetch(
        `https://api.github.com/repos/${user}/${repo}/commits/${branch}`
    );
    const data = await response.json();
    return new Date(data.commit.committer.date);
}

function renderCounter(number) {
    counterEl.innerHTML = "";
    String(number).split("").forEach(digit => {
        const img = document.createElement("img");
        img.src = `images/asoul/${digit}.gif`;
        img.className = "digit-img";
        counterEl.appendChild(img);
    });
}

(async () => {
    try {
        const lastCommitDate = await fetchLastCommitDate();
        const diffDays = Math.floor((new Date() - lastCommitDate) / (1000 * 60 * 60 * 24));
        renderCounter(diffDays);
    } catch (error) {
        console.error("Error al cargar:", error);
    }
})();