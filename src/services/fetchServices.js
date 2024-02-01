import { API } from "../container/config/api";
import axios from "axios";

const get = async (url) => {
    try {
        let data = [];
        data = (await API.get(url)).data;
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

const getMultipleEndpoints = async (urls) => {
    try {
        let data = [];
        let endpoints = [...urls];

        data = await axios.all(endpoints.map((endpoint) => API.get(endpoint)));
        return buildData(data);
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

const post = async (url, data) => {
    try {
        let result = [];
        result = await API.post(url, data);
        return result;
    } catch (error) {
        console.log("Error with POST: ", error);
        return [];
    }
};
/**
 * This will take the title from the pocketguides and merge them into to the corresponding
 * @param arr
 * @returns {*[]}
 */
const buildData = (arr) => {
    // some implementation ...
    return null;
}

const getPostByID = async(url) =>{
    try{
        let result = await API.get(url);
        return result;
    }catch(error){
        console.log("error while fetching post ",error);
        return null;
    }
}

const deletePost = async(url) =>{
    try{
        const response = await API.delete(url);
        return response.data;

    }catch(e){

    }
}

// const addPost = async(data) =>{
//     try{
//         const response = await API.post(url,)
//     }
// }


export const fetchService = {
    get,
    getMultipleEndpoints,
    post,
    getPostByID,
    deletePost

};
