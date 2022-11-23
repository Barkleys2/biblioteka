import Cats from "../../Contexts/Cats";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [books, setBooks] = useState(null);
    const [cats, setCats] = useState(null);
    const { makeMsg } = useContext(DataContext);

    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.title)) {
                d.set(line.title, [...d.get(line.title), line]);
            } else {
                d.set(line.title, [line]);
            }
        });
        return [...d];
    }

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/books/wc', authConfig())
            .then(res => {
                setBooks(reList(res.data));
            })
    }, [lastUpdate]);

    useEffect(() => {
        if (null === cats) {
            return;
        }
        axios.delete('http://localhost:3003/server/cats/' + cats.id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            })
    }, [cats, makeMsg]);

    return (
        <Cats.Provider value={{
            setCats,
            books
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Cats.Provider>
    );
}

export default Main;