import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();

/*==========================================
load data first Time
==========================================*/
var loadPostsFromDatabase = function() {
    $.ajax({
        method: 'GET',
        url: '/posts',
        success: function (posts) {
            postsRenderer.renderPosts(posts);
        }
    });
}

loadPostsFromDatabase();
