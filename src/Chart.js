import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CheckedPrefsState } from './State.js';
import './Chart.css';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
let labels;
const colors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
];
const getColor = (index) => colors[index % colors.length];
const Chart = (props) => {
    const prefs = props.prefsResource.data.result;
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
            if (!labels && res.length > 0) labels = res[0].data.result.data[0].data.map((e) => e.year);
            setData(res.map((e, i) => ({
                label: prefs[checkedPrefs[i]].prefName,
                data: e.data.result.data[0].data.map((e) => e.value)
            })));
        });
    }, [checkedPrefs]);
    if (!data || data.length === 0) return <div className='chart'><h1>都道府県を選択してください</h1></div>;
    const chartData = {
        labels,
        datasets: data.map((e, i) => ({
            ...e,
            backgroundColor: getColor(i),
            borderColor: getColor(i)
        }))
    };
    return (
        <div className='chart'>
            <Line
                data={chartData}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
}
export default Chart;