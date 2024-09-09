#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
    console.error('Please provide a movie ID.');
    process.exit(1);
}

// Fetch film details
request(`https://swapi.dev/api/films/${movieId}/`, { json: true }, (err, res, body) => {
    if (err) {
        return console.error('Error fetching film details:', err);
    }

    if (res.statusCode !== 200) {
        return console.error('Film not found. Status code:', res.statusCode);
    }

    const characterUrls = body.characters;

    // Fetch characters
    characterUrls.forEach((url) => {
        request(url, { json: true }, (err, res, body) => {
            if (err) {
                return console.error('Error fetching character details:', err);
            }

            console.log(body.name);
        });
    });
});
