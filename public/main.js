import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';

let postsRepository = new PostsRepository();
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);

eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerEditPost();
eventsHandler.registerToggleEditPost();
eventsHandler.registerToggleComments();
eventsHandler.registerToggleEditComments();
eventsHandler.registerAddComment();
eventsHandler.registerEditComment();
eventsHandler.registerRemoveComment();

/*==========================================
load data first Time
==========================================*/
var loadPostsFromDatabase = function() {
    var currentPosts = postsRepository;
    var currentRenderer = postsRenderer;
    $.ajax({
        method: 'GET',
        url: '/posts',
        success: function (posts) {
            currentPosts.posts = posts;
            currentRenderer.renderPosts(currentPosts.posts);
        }
    });
}

loadPostsFromDatabase();