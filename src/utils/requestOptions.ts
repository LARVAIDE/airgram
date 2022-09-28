const REQUEST_OPTIONS = {
    'GET': (url: string = '', data: any = {}): string => {
        let dataStr = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.replace(/\&$/g, '')
            url = url + '?' + dataStr;
        }
        return url
    }
}

export default REQUEST_OPTIONS