export function getDadata(query, saveData) {
  if (!query) return;

  var url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
  var token = "6d3cd0820fde526519ca53b99f5d70fbef6b7941";

  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: query, count: 300 }),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((result) => saveData(result))
    .catch((error) => console.log("error", error));
}
