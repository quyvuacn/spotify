let accessToken
const cliendID = '34a458ab7d504cf5949a47df7c242085'
const redirecURI = 'https://quyvuacn.github.io/spotify/'
const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken
        }
        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            //This clears the parameters, allowing us to grab token when it expires.
            window.setTimeout(()=> accessToken='',expiresIn*1000)
            // window.history.pushState('Access Token',null,'/spotify')
            return accessToken
        }else {
            const  accessUrl = `https://accounts.spotify.com/authorize?client_id=${cliendID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirecURI}`
            window.location = accessUrl
        }
    },
    search(term){
        const accessToken = this.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                }
            )
            .then(response=>response.json())
            .then(jsonData =>{
                if (!jsonData.tracks){
                    return []
                }
                return  jsonData.tracks.items.map(
                    track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri

            })
                )
            })

    },
    savePlayList(name,trackURIs){
        if(!name  || !trackURIs ){
            return
        }

        const accessToken = this.getAccessToken()
        const  headers ={
            Authorization: `Bearer ${accessToken}`
        }
        let userID;

        return fetch(`https://api.spotify.com/v1/me`,{headers:headers})
                .then(response=>response.json())
                .then(jsonResponse =>{
                    userID = jsonResponse.id
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                    {
                            headers:headers,
                            method : 'POST',
                            body   : JSON.stringify({name:name})
                        }
                        ).then(response => response.json())
                         .then(jsonResponse =>{
                             const playListID = jsonResponse.id
                             return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playListID}/tracks`,{
                                 headers:headers,
                                 method:"POST",
                                 body : JSON.stringify({uris:trackURIs})
                             })
                         })
                })

    }
}

export  default Spotify