import axios from 'axios';
import stringFormat from 'string-format'; 

// Constructs the api strings with a main config using JS getters
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
const paths = {
    // string-format used to interpolate api params into {} occurrences
    root:          'https://jsonplaceholder.typicode.com',
    get posts()    { return `${this.root}/posts`; },
    get post()     { return `${this.posts}/{}`; },
    get comments() { return `${this.posts}/{}/comments`; },
    get error404() { return `${this.posts}/doesnotexist`; }
};

// Some error strings
const errors = {
    request: 'There was a problem with your request:',
    postId: 'A valid post ID was not supplied',
};

const handleError = (errString = '', e = '') => {
    return console.error(`${errString} ${e}`);
};

export default class ExampleApi {
    getPosts() {
        return axios.get(paths.posts); // axios.get
    }

    getPost(postId = null) {
        return postId
            ? axios.get(stringFormat(paths.post, postId)) // string-format to add postId
            : handleError(errors.postId);
    }

    getPostComments(postId = null) {
        return postId
            ? axios.get(stringFormat(paths.comments, postId)) // string-format to add postId
            : handleError(errors.postId);
    }

    getError404() {
        return axios.get(paths.error404);
    }
};

axios.interceptors.response.use(response => {
    return response;
}, e => {
    handleError(errors.request, e); // Global request error handler
    return e; // Return to allow chaining to further handle error downstream (e.g. a front end modal)
});