import axios from "axios";

const login = async ({email, password}) => {
    const response = await axios.post('/api/login', { email, password });
    return reponse.data;
};