import { useState, useEffect, useContext } from 'react';
import Cats from "../../Contexts/Cats";
import Line from './Line';


function List() {

    const { books } = useContext(Cats);
    const [stats, setStats] = useState({ booksCount: null });


    useEffect(() => {
        if (null === books) {
            return;
        }
        setStats(s => ({ ...s, booksCount: books.length }));
    }, [books]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Book List ({stats.booksCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        books?.map(m => <Line key={m[1][0].id} books={m} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;