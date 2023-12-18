'use client';
import { useEffect, useState } from 'react';
import './Board.css';
import Profile from './Profile';
import { getNominees } from '@/app/services/nominee';
import Nominee from '@/app/interfaces/nominee';
export default function Board() {

    const [nominees, setNominees] = useState<Nominee[]>([]);
    const [filteredNominees, setFilteredNominees] = useState<Nominee[]>([]);
    useEffect(() => {
        getNominees().then((data) => {
            setNominees(data);
            setFilteredNominees(data);
        });
    }
        , []);

    const handlerFilterClick = (e: any) => {
        const filter = e.target.dataset.id;
        switch (filter) {
            case 'heads':
                setFilteredNominees(nominees.slice(0, 3));
                break;
            case 'tails':
                setFilteredNominees(nominees.slice(-3));
                break;
            case 'all':
                setFilteredNominees(nominees);
                break;
            default:
                break;
        }
    }

    return (
        <div className='board'>
            <h1 className='leaderboard'>The Voice INDT</h1>
            <div className='filter'>
                <button onClick={handlerFilterClick} data-id='heads'>Primeiros</button>
                <button onClick={handlerFilterClick} data-id='tails'>Ultimos</button>
                <button autoFocus={true} onClick={handlerFilterClick} data-id='all'>Todos</button>
            </div>

            <Profile data={filteredNominees} />
        </div>
    );
}