import { get, interceptors } from 'axios';
import stringFormat from 'string-format'; 

// Constructs the api strings with a main config using JS getters
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
const api = {
    root: 'https://jsonplaceholder.typicode.com',
    // Using getters so we can progressively construct paths by referencing properties
    get posts() {
        return `${this.root}/posts`;
    },
    get post() {
        // Uses a string-format, a Python-esque string method for interpolating rest params
        // This is so we can still use getters which support object literal self-references
        return `${this.posts}/{}`;
    },
    get comments() {
        return `${this.posts}/{}/comments`;
    }
}

// Some error strings
const errors = {
    request: 'There was a problem with your request:',
    postId: 'A valid post ID was not supplied',
}

export default class ExampleApi {
    getPosts() {
        return get(api.posts) // axios.get
    }

    getPost(postId = null) {
        return postId
            ? get(stringFormat(api.post, postId))
            : this.handleError(errors.postId)
    }

    getPostComments(postId = null) {
        return postId
            ? get(stringFormat(api.comments, postId))
            : this.handleError(errors.postId)
    }

    handleError(errString = '', e = '') {
        return console.error(`${errString} ${e}`);
    }
};

interceptors.response.use(response => {
    return response;
}, e => {
    ExampleApi.handleError(errors.request, e);
    return e; // Allow chaining beyond this point so 
});