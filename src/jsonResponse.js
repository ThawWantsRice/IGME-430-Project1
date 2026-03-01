const url = require('url');
const pokedexData = require('./json/pokedex.json');

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  };

  response.writeHead(status, headers);

  //No response body on HEAD and No-Content
  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }

  response.end();
};

//GET AND HEAD API CALLS

//Get Pokemon based on their name
//Partial search query
const getPokemon = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { name } = parsedUrl.query;

  if (!name) {
    return respondJSON(request, response, 200, pokedexData);
  }

  //Partial Search
  //https://stackoverflow.com/questions/70695208/how-best-to-search-a-javascript-array-for-partial-matches
  const found = pokedexData.filter((search) => search.name.toLowerCase().startsWith(name.toLowerCase()));

  if (found.length == 0) {
    const responseJSON = {
      message: "Pokemon not found",
      id: "notFound"
    }
    return respondJSON(request, response, 404, responseJSON);
  }

  return respondJSON(request, response, 200, found);
};

//Get Pokemon by their type
//Has to be a fully written i.e Grass not gra 
const getPokemonType = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { type } = parsedUrl.query;

  if (!type) {
    return respondJSON(request, response, 400, { message: "Type Parameter is required", id: 'missingTypeParams' });
  }

  const found = pokedexData.filter((pokemon) => pokemon.type.some(t => t.toLowerCase() === type.toLowerCase()));

  if (found.length === 0) {
    return respondJSON(request, response, 404, { message: "No Pokemon found for this type", id: 'notFound' });
  }

  return respondJSON(request, response, 200, found);
}

//Get the IMG URL associated with the pokemon
const getPokemonIMG = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { name } = parsedUrl.query;

  if (!name) {
    return respondJSON(request, response, 400, { message: "Name Parameter is required", id: 'missingNameParams' });
  }

  const found = pokedexData.find((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());

  if (!found) {
    return respondJSON(request, response, 404, { message: "No Pokemon found", id: 'notFound' });
  }

  return respondJSON(request, response, 200, { name: found.name, img: found.img });
}

//Get the Pokemon Size(Weight and Height)
const getPokemonSize = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { name } = parsedUrl.query;

  if (!name) {
    return respondJSON(request, response, 400, { message: "Name Parameter is required", id: 'missingNameParams' });
  }

  const found = pokedexData.find((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());

  if (!found) {
    return respondJSON(request, response, 404, { message: "No Pokemon found", id: 'notFound' });
  }

  return respondJSON(request, response, 200, { name: found.name, weight: found.weight, height: found.height });
}

//POST API ENDPOINTS

const addPokemon = (request, response) => {
  let { name, type, weight, height, img } = request.body;

  if (!name || !type || !weight || !height) {
    return respondJSON(request, response, 400, {
      message: 'Missing required fields',
      id: 'missingParams',
    });
  }

  //Make sure type is a []
  if (!Array.isArray(type)) {
    type = [type];
  }

  // Allow empty img
  img = img || '';

  //Check for already used pokemon names and thus entries
  const existingPokemon = pokedexData.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
  if (existingPokemon) {
    // Update existing Pokémon
    existingPokemon.type = type;
    existingPokemon.weight = weight;
    existingPokemon.height = height;
    existingPokemon.img = img;

    return respondJSON(request, response, 204, {});
  }

  //Grab latest number id
  const id = pokedexData[pokedexData.length - 1].id + 1;
  const num = `${id}`;

  const newPokemon = {
    id,
    num,
    name,
    type,
    weight,
    height,
    img,
    weaknesses: [],
  };

  pokedexData.push(newPokemon);

  // 201 Created with body
  return respondJSON(request, response, 201, {
    pokemon: newPokemon,
  });
}


const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getPokemon,
  getPokemonType,
  getPokemonIMG,
  getPokemonSize,
  notFound,
  addPokemon,
};