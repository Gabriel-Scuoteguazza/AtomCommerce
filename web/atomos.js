async function receberInformacoes() {
    const atom = await fetch("http://localhost:3333").then(response => response.json())

    atom.map(atom => {
        document.querySelector("#atoms-list").innerHTML += `
        <article class="atom-card">
                <h3>${atom.name}</h3>
                <p class="atom-meta">Número atômico (Z): ${atom.z}</p>
                <p class="atom-meta">Massa atômica: ${atom.mass}</p>
                <span class="atom-symbol">${atom.symbol}</span>
            </article>
        `
    })
}

receberInformacoes()