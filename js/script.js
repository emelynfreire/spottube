const form = document.querySelector('form');
const createPlaylistButton = document.querySelector('#create_playlist_button');

createPlaylistButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  const youtubePlaylistId = document.querySelector('#youtube_playlist_id').value;
  const playlistName = document.querySelector('#playlist_name').value;
  const youtubeApiKey = document.querySelector('#youtube_api_key').value;
  const spotifyClientId = document.querySelector('#spotify_client_id').value;
  const spotifyClientSecret = document.querySelector('#spotify_client_secret').value;
  const redirectUri = document.querySelector('#redirect_uri').value;


// Importando as bibliotecas necessárias
const fetch = require('node-fetch');
const querystring = require('querystring');

// Definindo as informações de autenticação para o YouTube e o Spotify
const YOUTUBE_API_KEY = 'SUA_CHAVE_DE_API_DO_YOUTUBE';
const SPOTIFY_CLIENT_ID = 'SEU_ID_DO_CLIENTE_DO_SPOTIFY';
const SPOTIFY_CLIENT_SECRET = 'SEU_CLIENT_SECRET_DO_SPOTIFY';
const REDIRECT_URI = 'SUA_URL_DE_REDIRECT_DO_SPOTIFY';

// Função para buscar a lista de reprodução do YouTube
async function getYouTubePlaylist(playlistId) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.items;
}

// Função para buscar o token de acesso do Spotify
async function getSpotifyAccessToken() {
  const auth = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const base64Auth = Buffer.from(auth).toString('base64');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64Auth}`,
    },
    body: querystring.stringify({ grant_type: 'client_credentials' }),
  });
  const json = await response.json();
  return json.access_token;
}

// Função para buscar o ID da playlist do Spotify
async function getSpotifyPlaylistId(accessToken, playlistName) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(playlistName)}&type=playlist&limit=1`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await response.json();
  return json.playlists.items[0].id;
}

// Função para adicionar uma música à playlist do Spotify
//async function addTrackToSpotifyPlaylist(accessToken, playlistId, trackUri) {
  //const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  //const response = await fetch(url, {
    //method: 'POST',
    //headers: {
      //'Content-Type': 'application/json',
      


}
