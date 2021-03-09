import axios from "axios";


export const login = (username: string, password:string) : Promise<any> =>{

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    //const url: string = (process.env.REACT_APP_LOGIN_URL as string);
    const url  = "http://dev.prowmes.com/panel/login";

    const params = new URLSearchParams()

    params.append('username', username)
    params.append('password', password)
    params.append('react', String(true))

    return axios.post(url, params, config);
}


