import { useState, useContext, useRef } from 'react';
import DataContext from '../../Contexts/DataContext';
import Books from '../../Contexts/Books';
import getBase64 from '../../Functions/getBase64';

function Create() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const fileInput = useRef();

    const { setCreateData } = useContext(Books);
    const {makeMsg} = useContext(DataContext);

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const add = () => {
        if (title.length === 0 || title.length > 50) {
            makeMsg('Invalid title', 'error');
            return;
        }
        if (price.replace(/[^\d.]/, '') !== price) {
            makeMsg('Invalid price', 'error');
            return;
        }
        if (parseFloat(price) > 99.99) {
            makeMsg('Max price is 99.99 Eur', 'error');
            return;
        }



        setCreateData({
            title,
            price: parseFloat(price),
            image: photoPrint
        });
        setTitle('');
        setPrice('');
        setPhotoPrint(null);
        fileInput.current.value = null;
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">New Book</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Book title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Book Price</label>
                    <input type="text" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Book Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;