const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    enviarInformacoes()
}

async function enviarInformacoes() {
    const name = document.querySelector("#name").value
    const z = document.querySelector("#z").value
    const mass = document.querySelector("#mass").value
    const symbol = document.querySelector("#symbol").value


    if (name === "" || z === "" || mass === "" || symbol === "") {
        alert("Preencha todas as informações")
        return
    }

    const user = {
        name,
        z,
        mass,
        symbol
    }

    const response = await fetch("http://localhost:3333/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })

    }).then(response => response.json())

    const { message } = response

    alert(response.message)
}