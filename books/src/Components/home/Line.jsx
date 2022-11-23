import { useContext } from 'react';
import Home from '../../Contexts/Home';

import { useState } from "react";

function Line({ books }) {

    const { setRateData, setCats } = useContext(Home);

    const [rate, setRate] = useState(5);
    const [post, setPost] = useState('');

    const doRating = () => {
        setRateData({
            id: books[1][0].id,
            rate
        });
        setRate(5);
    }

    const add = () => {
        setCats({
            post,
            books_id: books[1][0].id
        });
        setPost('');
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">

                    <div className="home__content__info">
                        <h2>{books[0]}</h2>
                        {books[1][0].image ? <div className='img-bin'>
                            <img src={books[1][0].image} alt={books[0]}>
                            </img>
                        </div> : null}
                    </div>

                    <div className="home__content__price">
                        {books[1][0].price} Eur
                    </div>

                    <div className="home__content__info">
                        <h2>{books[1][0].rating ?? 'no rating'}</h2>
                        <select value={rate} onChange={e => setRate(e.target.value)}>
                            {
                                [...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)
                            }
                        </select>
                        <button onClick={doRating} type="button" className="btn btn-outline-success m-3">Rate</button>
                    </div>
                </div>
            </div>
            <div className="Cats">

                <ul className="list-group">
                    {
                        books[1]?.map(c => c.cid !== null ? <li key={c.cid} className="list-group-item"><p>{c.post}</p></li> : null)
                    }
                </ul>

                <div className="mb-3">
                    <label className="form-label">Add Comment</label>
                    <textarea className="form-control" value={post} onChange={e => setPost(e.target.value)}></textarea>
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </li>
    )
}

export default Line;