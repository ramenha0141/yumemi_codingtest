import { atom, selector } from 'recoil';
export const CheckState = atom({
    key: 'CheckState',
    default: []
});
export const CheckedPrefsState = selector({
    key: 'CheckedPrefsState',
    get: ({get}) => {
        const checkedPrefs = [];
        get(CheckState).forEach((e, i) => e && checkedPrefs.push(i));
        return checkedPrefs;
    }
})