import { useContext } from 'react';
import Books from '../../Contexts/Books';

function Line({ books }) {

    const { setDeleteData, setModalData } = useContext(Books);

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__info">
                        {books.image ? <div className='img-bin'>
                            <img src={books.image} alt={books.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                        {books.title}
                    </div>
                    <div className="line__content__info">
                        {books.price}
                    </div>
                    <div className="line__content__info">
                        {books.rating ?? 'no rating'}
                    </div>
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(books)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(books)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;