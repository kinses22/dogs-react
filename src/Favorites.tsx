import React, {useEffect, useState} from "react";

function Favorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (localStorage.getItem('favorites') !== null) {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') as string);
            setFavorites(storedFavorites);
        }
    }, []);

    const removeFavorite = (favorite: string) => {
        const updatedFavorites = favorites.filter((fav) => fav !== favorite);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }


    return (
        <div className="app">
            <h1>Dog Gallery</h1>
            <div className="media-container">
                {favorites.length > 0 ? (
                    favorites.map((favorite, index) => (
                        <div key={index} className="dog-card">
                            {favorite.endsWith('.mp4') ? (
                                <>
                                    <video role="video" controls autoPlay={true} muted={true} loop={true}
                                           className="dog-image">
                                        <source src={favorite} type="video/mp4"/>
                                    </video>
                                    <button onClick={() => removeFavorite(favorite)}>Remove From Favorites
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img src={favorite} alt={`Dog ${index}`} className="dog-image"/>
                                    <button onClick={() => removeFavorite(favorite)}>Remove From Favorites
                                    </button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No favorites available</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;
