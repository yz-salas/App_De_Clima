const contInfo = document.getElementById("render");
const form = document.getElementById("form");
const nameCountry = document.getElementById("input1");
const nameCity = document.getElementById("input2");

function showError(message) {
    const nodeMessage = document.createElement("h4");
    nodeMessage.id = "mensage";
    nodeMessage.innerText = message;

    const nodeForm = document.getElementById("form");
    nodeForm.appendChild(nodeMessage);

    setTimeout(() => {
        nodeMessage.remove();
    }, 3000);
}

function validarNodos() {
    const node = document.getElementById("divCont");
    if (node) {
        node.remove();
    }
}

function callApi(city, country) {
    const ApiID = "8139bf87389c32c29c60fd461b86c09b";
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${ApiID}`;
    try {
        fetch(Url)
            .then((data) => {
                return data.json();
            })
            .then((dataJson) => {
                // ? destructuramos los datos que nesesitaremos de la api.
                if (dataJson.cod === "404") {
                    showError("ciudad no encontrada");
                }
                const {
                    name,
                    main: { feels_like, temp_max, temp_min },
                    weather: [arr],
                } = dataJson;

                validarNodos();

                const divCont = document.createElement("div");
                divCont.id = "divCont";
                divCont.innerHTML = `
                <h2>clima en ${name}</h2>
                <img src= "https://openweathermap.org/img/wn/${arr.icon}@2x.png">
                <h1>${feels_like}ºC</h1>
                <p id="txt-max-max">max: ${temp_max}ºC</p>
                <p id="txt-max-min">min: ${temp_min}ºC</p>
                `;

                contInfo.append(divCont);
            });
    } catch (error) {
        console.log("A ocurrido un error en " + error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (nameCity.value === "" || nameCountry.value === "") {
        showError("Ambos campos son obligatorios");
        return;
    }

    callApi(nameCity.value, nameCountry.value);
});
