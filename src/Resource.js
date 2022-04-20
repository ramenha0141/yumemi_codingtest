class Resource {
    constructor(promise) {
        this._promise = promise;
        promise.then((data) => {
            this._data = data;
            this.state = 'resolved';
        }).catch(() => {
            this.state = 'rejected';
        })
    }
    static fromAxios(axios) {
        return new Resource(new Promise(
            (resolve, reject) => axios.then((data) => resolve(data.data)).catch(e => reject(e))
        ));
    }
    state = 'pending';
    _data = null;
    get data() {
        if (this.state === 'pending') {
            throw this._promise;
        } else {
            return this._data;
        }
    }
}
export default Resource;