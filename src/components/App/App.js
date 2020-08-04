import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.every(element => element.id !== track.id)) {
      const tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    };
  }

  removeTrack(track) {
    if(this.state.playlistTracks.some(element => element.id === track.id)) {
      const tracks = this.state.playlistTracks.filter(song => song.id !== track.id);
      this.setState({playlistTracks: tracks});
      
    };
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    if(this.state.playlistName) {
      Spotify.postPlaylist(this.state.playlistName, trackUris).then(() => {
        this.setState({playlistTracks: [],playlistName: ''});
        alert('Done!');
      });
    } else {
      alert('Enter a valid Playlist Name');
    }
  }

  search(term) {
    Spotify.postPlaylist()
    Spotify.search(term).then(result => {this.setState({searchResults: result})});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  render() {  
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
