import axios from 'axios';
const json = (await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    headers: { 'X-API-KEY': 'Hnc3xXo0TcbF3SZGnlQTl9qe56JwqU3b1PzIvrI6' }
})).data;
console.log(json);