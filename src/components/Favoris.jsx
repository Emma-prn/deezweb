import React, { useState } from 'react';
import FavService from '../FavService';
import Track from './Track';

function Favoris(props) {
    const [musics, setMusics] = useState(FavService.getFavoritesFromStorage());
    // On récupère les favoris stocké dans le local storage
    function onFavorites(music){
        FavService.toggleFavorite(music);
        setMusics(FavService.getFavoritesFromStorage());
    }
    // On les affiche grâce à la function map et en utilisant le composant Track
    return (
            <main className="container mt-3">
                <h1>Mes favoris</h1>
                <p>Liste de mes titres favoris</p>
                <hr />
                {musics.length && musics.map(music => (
                    <Track
                        key={music.id}
                        music={music}
                        onClick={onFavorites}
                        isFavorite={FavService.isFavorite(music)}
                    />
                )) || <h3>Aucun favoris dans votre liste ...</h3>}
            </main>
        );
    }


export default Favoris;