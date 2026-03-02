//Content Response for API Test Page
const handleResponse = async (response, parseResponse) => {
    const content = document.querySelector('#content');

    switch (response.status) {
        case 200:
            content.innerHTML = '<b>Success</b>';
            break;
        case 201:
            content.innerHTML = '<b>Created</b>';
            break;
        case 204:
            content.innerHTML = '';
            const statusLine = `<p><strong>Status:</strong> ${response.status}</p>`;
            const lengthLine = `<p><strong>Content-Length:</strong> ${response.headers.get('content-length') || 'Unknown'}</p>`;
            const responseLine = `<p><strong>Response:</strong></p>`;
            content.innerHTML += statusLine + lengthLine + responseLine;
            break;
        case 400:
            content.innerHTML = '<b>Bad Request</b>';
            break;
        case 404:
            content.innerHTML = '<b>Not Found</b>';
            break;
        default:
            content.innerHTML = `Error code not implemented by client.`;
            break;
    }

    if (parseResponse && response.status !== 204) {
        try {
            const obj = await response.json();
            const statusLine = `<p><strong>Status:</strong> ${response.status}</p>`;
            const lengthLine = `<p><strong>Content-Length:</strong> ${response.headers.get('content-length') || 'Unknown'}</p>`;
            const responseLine = `<p><strong>Response:</strong></p><pre>${JSON.stringify(obj, null, 2)}</pre>`;

            content.innerHTML += statusLine + lengthLine + responseLine;
        } catch (err) {
            content.innerHTML += `<p>Empty Body</p>`;
        }
    }
};

//GET/HEAD
const sendRequest = async (form) => {
    const url = form.getAttribute('action');
    const method = form.querySelector('input[name="method"]:checked').value;

    //Check for text in textFields
    const input = form.querySelector('input[name]');
    if (!input) {
        console.error("No input found in form!");
        return;
    }
    const paramKey = input.name;
    const paramValue = input.value.trim();

    const requestUrl = paramValue ? `${url}?${encodeURIComponent(paramKey)}=${encodeURIComponent(paramValue)}` : url;

    const response = await fetch(requestUrl, {
        method,
        headers: {
            'Accept': 'application/json',
        },
    });

    handleResponse(response, true);
};

//Add Pokemon Entry
const sendPost = async (form) => {
    const url = form.getAttribute('action');
    const method = form.getAttribute('method');

    const name = form.querySelector('#addPokemonName').value;
    const primary = form.querySelector('#addPrimaryType').value;
    const secondary = form.querySelector('#addSecondaryType').value;

    let type = [primary];
    if (secondary && secondary !== primary) type.push(secondary);

    const weight = form.querySelector('#addWeight').value;
    const height = form.querySelector('#addHeight').value;
    const img = form.querySelector('#addImg').value || '';

    const dataType = form.querySelector('#addDataType').value;

    let formData;

    if (dataType === 'application/json') {
        formData = JSON.stringify({ name, type, weight, height, img });
    } else {
        // URL-encoded
        //https://stackoverflow.com/questions/72073191/how-do-i-url-encode-spaces-and-the-word-and
        //This took 2 hrs
        formData = `name=${encodeURIComponent(name)}&weight=${encodeURIComponent(weight)}&height=${encodeURIComponent(height)}&img=${encodeURIComponent(img)}`;
        type.forEach((t) => formData += `&type=${encodeURIComponent(t)}`);
    }

    const response = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': dataType,
            'Content-Length': formData.length,
        },
        body: formData,
    });

    handleResponse(response, true);
};

const init = () => {
    const addPokemonForm = document.querySelector("#addPokemonForm");
    const getPokemonForm = document.querySelector('#getPokemonForm');
    const getPokemonTypeForm = document.querySelector('#getPokemonTypeForm');
    const getPokemonIMGForm = document.querySelector("#getPokemonIMGForm");
    const getPokemonSizeForm = document.querySelector("#getPokemonSizeForm");

    const getPokemon = (e) => {
        e.preventDefault();
        sendRequest(getPokemonForm);
        return false;
    }

    const getPokemonType = (e) =>{
        e.preventDefault();
        sendRequest(getPokemonTypeForm);
        return false;
    }

    const getPokemonIMG = (e) =>{
        e.preventDefault();
        sendRequest(getPokemonIMGForm);
        return false;
    }

    const getPokemonSize = (e) =>{
        e.preventDefault();
        sendRequest(getPokemonSizeForm);
        return false;
    }

    const addPokemon = (e) => {
        e.preventDefault();
        sendPost(addPokemonForm);
        return false;
    }

    getPokemonForm.addEventListener('submit', getPokemon);
    getPokemonTypeForm.addEventListener('submit', getPokemonType);
    getPokemonIMGForm.addEventListener('submit', getPokemonIMG);
    getPokemonSizeForm.addEventListener('submit', getPokemonSize);
    addPokemonForm.addEventListener('submit', addPokemon);

}

window.onload = init;