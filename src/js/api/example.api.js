import { get, interceptors } from 'axios';
import stringFormat from 'string-format'; 

// Constructs the api strings with a main config using JS getters
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
const paths = {
    // Progressively constructs api paths using getters for literal self-reference
    // support 
    root:          'https://jsonplaceholder.typicode.com',
    get posts()    { return `${this.root}/posts`; },
    get post()     { return `${this.posts}/{}`; },
    get comments() { return `${this.posts}/{}/comments`; },
    get error404() { return `${this.posts}/doesnotexist`; }
}

// Some error strings
const errors = {
    request: 'There was a problem with your request:',
    postId: 'A valid post ID was not supplied',
}

const handleError = (errString = '', e = '') => {
    return console.error(`${errString} ${e}`);
};

export default class ExampleApi {
    getPosts() {
        return get(paths.posts) // axios.get
    }

    getPost(postId = null) {
        return postId
            ? get(stringFormat(paths.post, postId))
            : handleError(errors.postId)
    }

    getPostComments(postId = null) {
        return postId
            ? get(stringFormat(paths.comments, postId))
            : handleError(errors.postId)
    }

    getError404() {
        return get(paths.error404)
    }
};

interceptors.response.use(response => {
    return response;
}, e => {
    handleError(errors.request, e); // Global request error handler
    return e; // Return to allow chaining to further handle error downstream (e.g. a front end modal)
});