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

        editPost(index, postId, postText) {
            var current = this;
            return $.ajax({
                method: 'PUT',
                url: `/posts/${postId}/edit`,
                data: {
                    postText: postText
                },
                success: function (post) {
                    current.posts[index] = post;
                }
            });
        }

        removePost(postId, index) {
            // this.posts.splice(index, 1);
            var current = this;
            return $.ajax({
                method: 'DELETE',
                url: `/posts/${postId}`,
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

        editComment(postIndex, commentIndex, postId, commentId, comment) {
            var current = this;
            return $.ajax({
                method: 'PUT',
                url: `/posts/${postId}/comments/${commentId}/edit`,
                data:{text: comment},
                success: function (result) {
                        if(result.ok){
                            current.posts[postIndex].comments[commentIndex].text=comment;
                        }
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