const axios = require("axios");

const URL = "https://rickandmortyapi.com/api/character/";
function getCharById(req, res) {
  const id = req.params.id;
  const apiUrl = `${URL}${id}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const character = response.data;
      const { id, status, name, species, origin, image, gender } = character;
      const characterData = {
        id,
        status,
        name,
        species,
        origin,
        image,
        gender,
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(CharacterData));
    })
    .catch((err) => {
      const message = "Ocurrió un error en la funcion de getCharById";
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(message);
    });
}
module.exports = { getCharById };
//-------------------------------------------------------------------------------------
//TODO EL CODIGO QUE HICE CON PROMISES, AHORA LO MODIFICO PARA TRABAJAR CON EXPRESS

// const axios = require("axios");
// const http = require("http");

// function getCharById(res, id) {
//   return new Promise((resolve, reject) =>
//     axios
//       .get(`https://rickandmortyapi.com/api/character/${id}`)
//       .then((response) => {
//         const character = {
//           id: id,
//           name: response.data.name,
//           gender: response.data.gender,
//           species: response.data.species,
//           origin: response.data.origin,
//           image: response.data.image,
//           status: response.data.status,
//         };
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(character));
//       })
//       .catch((err) => {
//         const message = "Ocurrió un error en la funcion de getCharById";
//         res.writeHead(500, { "Content-Type": "text/plain" });
//         res.end(message);
//       })
//   );
// }
// module.exports = getCharById;
