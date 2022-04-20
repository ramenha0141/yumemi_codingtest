import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { FaCheck } from 'react-icons/fa';
import { CheckState } from './State.js';
import './PrefSelect.css';
import { IconContext } from 'react-icons';
const areas = [
    { name: '全国', start: 0, end: 47 },
    { name: '北海道地方', start: 0, end: 1 },
    { name: '東北地方', start: 1, end: 7 },
    { name: '関東地方', start: 7, end: 14 },
    { name: '中部地方', start: 14, end: 23 },
    { name: '近畿地方', start: 23, end: 30 },
    { name: '中国・四国地方', start: 30, end: 39 },
    { name: '九州地方', start: 39, end: 47 }
];
const PrefSelect = (props) => {
    const [check, setCheck] = useRecoilState(CheckState);
    const [area, setArea] = useState(0);
    const prefs = props.prefsResource.data.result;
    return (
        <div className='prefselect'>
            <div className='prefselect-area'>
                <select onChange={(e) => {
                    setArea(e.currentTarget.value);
                }}>
                    {
                        areas.map((e, i) => <option value={i} key={i}>{e.name}</option>)
                    }
                </select>
            </div>
            <IconContext.Provider value={{ color: 'rgb(128, 128, 128)' }}>
                <div className='prefselect-items'>
                    {
                        prefs.map((e, i) => (
                            <div
                                className={'prefselect-item' + (check[i] ? ' checked' : '')}
                                key={i}
                                onClick={() => {
                                    const newCheck = [...check];
                                    newCheck[i] = !check[i];
                                    setCheck(newCheck);
                                }}
                            >
                                {
                                    check[i] && <FaCheck></FaCheck>
                                }
                                <p>{e.prefName}</p>
                            </div>
                        )).slice(areas[area].start, areas[area].end)
                    }
                </div>
            </IconContext.Provider>
        </div>
    );
};
export default PrefSelect;