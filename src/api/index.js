
import axios from 'axios';

const baseUrl ='http://localhost:3000/'

export const validateUser= async (token)=>{
    try {
        const res = await axios.get(`${baseUrl}api/v1/artist/login`,{
            headers:{
                Authorization:'Bearer ' + token,
            }
        })
        return res.data;
    } catch (error) {
        
    }
}