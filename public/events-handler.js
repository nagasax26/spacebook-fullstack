class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    registerAddPost() {
        var current = this;
        $('#addpost').on('click', (e) => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                this.postsRepository.addPost($input.val()).done(function(){
                    current.postsRenderer.renderPosts(current.postsRepository.posts);
                });
                
                $input.val("");
            }
            });        
    }

    registerRemovePost() {
        var current = this;
        this.$posts.on('click', '.remove-post', (event) => {
           let index = $(event.currentTarget).closest('.post').index();
           let id = $(event.currentTarget).closest('.post').data().id;
            this.postsRepository.removePost(id, index).done(function(){
                current.postsRenderer.renderPosts(current.postsRepository.posts);
            });
          });
    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        var current = this;
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
          
            let postIndex = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data().id;
            let newComment = { text: $comment.val(), user: $user.val() };
          
            this.postsRepository.addComment(newComment, postIndex, postId).then(function(){
                current.postsRenderer.renderComments(current.postsRepository.posts, postIndex);
            });
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        var current = this;
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data().id;
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let commentId = $(event.currentTarget).closest('.comment').data().id;
            this.postsRepository.deleteComment(postIndex, commentIndex, postId, commentId).then(function(){
                current.postsRenderer.renderComments(current.postsRepository.posts, postIndex);
            });
        });
    }
}

export default EventsHandler