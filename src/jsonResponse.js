const fs = require('fs');
const { request } = require('http');
const path = require('path');
const url = require('url');

const pokedexData = JSON.parse(
  fs.readFileSync(path.join(__dirname, './json/pokedex.json'), 'utf-8')
);

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

  if (found.length === 0){
    return respondJSON(request, response, 404, { message: "No Pokemon found for this type", id: 'notFound' });
  }

  return respondJSON(request, response, 200, found);
}

const getPokemonIMG = (request, response) => {

}

const getPokemonSize = (request, response) => {

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
  notFound,
};