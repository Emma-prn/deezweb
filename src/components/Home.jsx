import React from 'react';
import { useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Track from './Track';
import FavService from '../FavService';
 
function Home(props) {
    // On créer les constantes qui prennent en compte les changements
    const [title, setTitle] = useState('');
    const [orderBy, setOrderBy] = useState('ALBUM_ASC');
    const [musics, setMusics] = useState([]);
    // Fonction si le titre change
    function changeTitle(e){
        setTitle(e.target.value);
    }
    // Fonction si l'ordre de classement change
    function changeOrderBy(e){
        setOrderBy(e.target.value);
    }
    // Fonction de recherche, on va chercher les musiques correspondantes au titre et à l'ordre donné
    function onSearch(e){
        e.preventDefault();
        const encodedTitle = encodeURIComponent(title);
        fetchJsonp(`https://api.deezer.com/search?q=${encodedTitle}&order=${orderBy}&output=jsonp`)
        .then(res => res.json())
        .then(data => data.data)
        .then(musics => {
            setMusics(musics);
        });
    }
    // Fonction pour les favoris
    function onFavorites(music){
        FavService.toggleFavorite(music);
        setMusics([...musics]);
    }

    return (
        <main className="container mt-3">
            <h1>Recherche</h1>
            <p>Recherchez un titre sur Deezer en utilisant le formulaire suivant :</p>
            <hr/>
            <form onSubmit={onSearch}>
                <div className="row">
                    <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Titre&nbsp;:</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id="searchText"
                            placeholder="Eminem, Armin Van Buuren, Rihanna, ..." onChange={changeTitle}/>
                    </div>
                    <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Trier par :</label>
                    <div className="col-sm-2">
                        <select id="order" className="custom-select" onChange={changeOrderBy}>
                            <option value="ALBUM_ASC">Album</option>
                            <option value="ARTIST_ASC">Artiste</option>
                            <option value="TRACK_ASC">Musique</option>
                            <option value="RANKING">Les plus populaires</option>
                            <option value="RATING_ASC">Les mieux notés</option>
                        </select>
                    </div>
                    <div className="col-sm-2 text-right">
                        <input type="submit" className="btn btn-primary" value="Go"/>
                    </div>
                </div>
            </form>
            <hr/>
            {/*<h3>Aucun résultat pour cette recherche ...</h3>*/ }
            <h2>Résultats</h2>
            <div className="card-group search-results">
                {musics.length && musics.map(music => {
                    return (
                        <Track key={music.id} music={music} onClick={onFavorites} isFavorite={FavService.isFavorite(music)}/>
                    );
                }) || <h3>Aucun résultat pour cette recherche ...</h3>}
                {/* ... */}
            </div>
        </main>
    );
}
 
export default Home;
