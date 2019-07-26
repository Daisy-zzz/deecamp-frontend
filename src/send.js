import request from './utils/request';
import API from "./utils/api";

export function hospitalSetting(data) {
    return request(API + '/hospital', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
}