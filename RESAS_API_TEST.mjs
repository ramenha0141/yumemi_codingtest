import axios from 'axios';
const json = (await axios.get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=13&cityCode=-', {
    headers: { 'X-API-KEY': 'Hnc3xXo0TcbF3SZGnlQTl9qe56JwqU3b1PzIvrI6' }
})).data;
console.dir(json.result.data[0].data, { depth: null });