import { Suspense } from 'react';
import axios from 'axios';
import Resource from './Resource.js';
import Title from './Title.js';
import PrefSelect from './PrefSelect.js';
import Chart from './Chart.js';
import './App.css';
const prefsResource = Resource.fromAxios(axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: { 'X-API-KEY': 'Hnc3xXo0TcbF3SZGnlQTl9qe56JwqU3b1PzIvrI6' }
}));
const App = () => {
    return (
        <div className='app'>
            <Title>Yumemi Frontend Coding Test</Title>
            <Suspense fallback={<p>loading...</p>}>
                <div className='main'>
                    <PrefSelect prefsResource={prefsResource}></PrefSelect>
                    <Suspense fallback={<p>loading...</p>}>
                        <Chart />
                    </Suspense>
                </div>
            </Suspense>
        </div>
    );
}
export default App;