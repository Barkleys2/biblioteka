import { useContext } from 'react';
import Cats from '../../Contexts/Cats';

function Line({ books }) {

    const { setCats } = useContext(Cats);

    const remove = id => {
        setCats({id});
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                        <h2>{books[0]} <small>({books[1].length})</small></h2>
                        {books[1][0].image ? <div className='img-bin'>
                            <img src={books[1][0].image} alt={books[0]}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__price">
                        {books[1][0].price} Eur
                    </div>
                </div>
            </div>
            <div className="cats">
                <ul className="list-group">
                    {
                        books[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item">
                            <p>{c.post}</p>
                            <div className="home__buttons">
                                <button onClick={() => remove(c.cid)} type="button" className="btn btn-outline-danger">Delete</button>
                            </div>
                        </li> : null)
                    }
                </ul>
            </div>
        </li>
    )
}

export default Line;