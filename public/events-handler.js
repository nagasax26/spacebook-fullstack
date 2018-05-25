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

    registerEditPost() {
        var current = this;
        this.$posts.on('click', '.edit-post', (event) => {
            let $post = $(event.currentTarget).siblings('.post');
            if ($post.val() === "") {
                alert("Please enter a post!");
                return;
              }
            
            let postIndex = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data().id;  
           
            this.postsRepository.editPost(postIndex, postId, $post.val()).then(function(){
                current.postsRenderer.renderPosts(current.postsRepository.posts);
            });
            $post.val("");
            
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

    registerToggleEditPost() {
        this.$posts.on('click', '.toggle-edit-post', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.edit-post-container').toggleClass('show');
          });
    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerToggleEditComments() {
        this.$posts.on('click', '.toggle-edit-comment', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.comment');
            $clickedPost.find('.edit-comment-container').toggleClass('show');
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

    registerEditComment() {
        var current = this;
        this.$posts.on('click', '.edit-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
          
            if ($comment.val() === "") {
              alert("Please enter a comment!");
              return;
            }
          
            let postIndex = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data().id;
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let commentId = $(event.currentTarget).closest('.comment').data().id;
          
            this.postsRepository.editComment(postIndex, commentIndex, postId, commentId, $comment.val()).then(function(){
                current.postsRenderer.renderComments(current.postsRepository.posts, postIndex);
            });
            $comment.val("");
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