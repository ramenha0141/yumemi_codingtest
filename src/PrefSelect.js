import { useRecoilState } from 'recoil';
import { FaCheck } from 'react-icons/fa';
import { CheckState } from './State.js';
import './PrefSelect.css';
import { IconContext } from 'react-icons';
const PrefSelect = (props) => {
    const [check, setCheck] = useRecoilState(CheckState);
    const prefs = props.prefsResource.data.result;
    return (
        <div className='prefselect'>
            <IconContext.Provider value={{ color: '#aaa' }}>
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
                    ))
                }
            </IconContext.Provider>
        </div>
    );
};
export default PrefSelect;