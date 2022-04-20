import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { CheckedPrefsState } from './State.js';
import './Chart.css';
const Chart = () => {
    const checkedPrefs = useRecoilValue(CheckedPrefsState);
    const [data, setData] = useState(null);
    useEffect(() => {
        Promise.all(
            checkedPrefs.map(
                (pref) => axios.get(
                    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${pref + 1}&cityCode=-`,
                    { headers: { 'X-API-KEY': 'Hnc3xXo0TcbF3SZGnlQTl9qe56JwqU3b1PzIvrI6' } }
                )
            )
        ).then((res) => {
            setData(res.map((e) => e.data.result.data[0].data.map((e) => e.value)));
        });
    }, [checkedPrefs]);
    return (
        <div className='chart'>
            {
                data && data.map((e) => e.map((e) => <h1>{e}</h1>))
            }
        </div>
    );
}
export default Chart;