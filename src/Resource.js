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