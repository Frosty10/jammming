import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'bobo', 
          artist: 'Samuel', 
          album: 'summer', 
          id: 12
        }, 
        {
          name: 'the clown', 
          artist: 'Smith', 
          album: 'depression', 
          id: 13
        }
      ],
      playlistName: 'Enter Playlist Name',
      playlistTracks: [
        {
          name: 'boboo', 
          artist: 'Samuel', 
          album: 'summer', 
          id: 11
        },
        {
          name: 'da clung', 
          artist: 'Smith', 
          album: 'depression', 
          id: 14
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  render() {  
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
