import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Favorites from "./Favorites";

function App() {
    const [dogs, setDogs] = useState<Dog[]>([])
    const [favorites, setFavorites] = useState<string[]>([])

    interface Dog {
        url: string
        fileSizeBytes: number
    }

    useEffect(() => {
        getDogs(6);
    }, [])

    const getDogs = async (count: number) => {
        try {
            const response = await Promise.all(
                Array.from({length: count}, () => fetch("https://random.dog/woof.json"))
            );
            const dogResponse = await Promise.all(response.map(response => response.json()))
            console.log(dogResponse);
            setDogs(dogResponse);
        } catch (e) {
            console.log("error")
        }
    };

    const handleNext = () => {
        getDogs(6);
    }

    const handleFavorite = (dogUrl: string) => {
        let storedFavorites;
        if (localStorage.getItem("favorites") !== null) {
            storedFavorites = JSON.parse(localStorage.getItem('favorites') as string)
            const existsFavorite = storedFavorites.some
            ((favorite: string | string[]) => favorite.includes(dogUrl));
            if (!existsFavorite) {
                setFavorites((prevFavorites) => [...prevFavorites, dogUrl]);
                localStorage.setItem('favorites', JSON.stringify([...favorites, dogUrl]));
            }
        } else {
            setFavorites((prevFavorites) => [...prevFavorites, dogUrl]);
            localStorage.setItem('favorites', JSON.stringify([...favorites, dogUrl]));
        }
    };


    return (
        <Router>
            <div className="app">
                <h1>Dog Gallery</h1>
                <nav>
                    <ul>
                        <li>
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/favorites">Favorites</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/">
                        <h2>Dogs</h2>
                        <div className="media-container">
                            {dogs.length > 0 ? (
                                dogs.map((dog, index) => (
                                    <div key={index} className="dog-card">
                                        {dog.url.endsWith('.mp4') ? (
                                            <>
                                                <video role="video" controls autoPlay={true} muted={true} loop={true}
                                                       className="dog-image">
                                                    <source src={dog.url} type="video/mp4"/>
                                                </video>
                                                <button onClick={() => handleFavorite(dog.url)}>Add to Favorites
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <img src={dog.url} alt={`Dog ${index}`} className="dog-image"/>
                                                <button onClick={() => handleFavorite(dog.url)}>Add to Favorites
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No dogs available</p>
                            )}
                        </div>
                        <button className="refresh-button" onClick={handleNext}>Next</button>

                    </Route>
                    <Route path="/favorites">
                        <Favorites/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
