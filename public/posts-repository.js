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

        addComment(newComment, postIndex) {
            this.posts[postIndex].comments.push(newComment);
        };

        deleteComment(postIndex, commentIndex) {
            this.posts[postIndex].comments.splice(commentIndex, 1);
        };
    }

    export default PostsRepository