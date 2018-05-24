    /**
     * @class Responsible for storing and manipulating Spacebook posts, in-memory
     */
    class PostsRepository {
        constructor() {
            this.posts = [];
        }

        addPost(postText) {
            var current = this;
            return $.ajax({
                method: 'POST',
                url: '/posts',
                data: {
                    postText: postText
                },
                success: function (post) {
                    current.posts.push(post);
                }
            });
        }

        removePost(id, index) {
            // this.posts.splice(index, 1);
            var current = this;
            return $.ajax({
                method: 'DELETE',
                url: `/posts/${id}`,
                success: function (res) {
                    if (res.ok) {
                        current.posts.splice(index, 1);
                    }
                }
            });
        }

        addComment(newComment, postIndex, postId) {
            var current = this;
            return $.ajax({
                method: 'POST',
                data:newComment,
                url: `/posts/${postId}/comments`,
                success: function (post) {
                        current.posts[postIndex] = post;
                }
            });
            
        };

        deleteComment(postIndex, commentIndex, postId, commentId) {
            var current = this;
            return $.ajax({
                method: 'DELETE',
                url: `/posts/${postId}/comments/${commentId}`,
                success: function (result) {
                        if(result.ok){
                            current.posts[postIndex].comments.splice(commentIndex, 1);
                        }
                }
            });
        };
    }

    export default PostsRepository