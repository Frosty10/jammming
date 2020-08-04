const clientId = '55faa678de3e4821940b75e51b2c10b7';
const redirectURI = 'http://localhost:3000/';
let userToken;

export const Spotify = {
    getAccessToken() {
        if (userToken) {
            return userToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        // console.log(accessTokenMatch);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // console.log(expiresInMatch);
        if (accessTokenMatch && expiresInMatch) {
            userToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => userToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
        
    },

    search(input) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${input}`, 
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if(response.ok) {
                let jsonResponse = response.json();
                return jsonResponse;
            }
        })
        .then(jsonResponse => {
            if(jsonResponse.tracks.items.length === 0) {
                return []
            } else {
                return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                }));
            };
        });
    }
}