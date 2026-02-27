const atomsList = document.querySelector("#atoms-list")

function renderAtomCard(atom) {
    return `
    <article class="atom-card" data-z="${atom.z}">
        <h3>${atom.name}</h3>
        <p class="atom-meta">Numero atomico (Z): ${atom.z}</p>
        <p class="atom-meta">Massa atomica: ${atom.mass}</p>
        <div class="atom-footer">
            <span class="atom-symbol">${atom.symbol}</span>
            <button class="atom-remove-btn" data-z="${atom.z}" type="button">Remover</button>
        </div>
    </article>
    `
}

function renderEmptyState() {
    if (!atomsList.children.length) {
        atomsList.innerHTML = '<p class="empty-state">Nenhum atomo cadastrado.</p>'
    }
}

async function receberInformacoes() {
    const atomos = await fetch("http://localhost:3333").then((response) => response.json())

    if (!atomos.length) {
        renderEmptyState()
        return
    }

    atomsList.innerHTML = atomos.map(renderAtomCard).join("")
}

async function removerAtomo(z, card) {
    const response = await fetch(`http://localhost:3333/atomos/${z}`, {
        method: "DELETE"
    })

    if (!response.ok) {
        alert("Nao foi possivel remover o atomo.")
        return
    }

    card.remove()
    renderEmptyState()
}

atomsList.addEventListener("click", (event) => {
    const target = event.target.closest(".atom-remove-btn")
    if (!target) {
        return
    }

    const card = target.closest(".atom-card")
    removerAtomo(target.dataset.z, card)
})

receberInformacoes()
