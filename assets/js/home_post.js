{   
    // method to submit the post using ajax
    let createPost= function(){
        let newPostFrom=$('#new-post-form');
        
        newPostFrom.submit(e=>{
            e.preventDefault();
            console.log("hrllo")
            $.ajax({
                
                type:'post',
                url:'/posts/create',
                // for serialize() for converting into json
                data:newPostFrom.serialize(),
                success:function(data){
                    console.log(data);
                    let newPost=newPostDom(data.data.post);
                    
                    $('#post-container>ul').prepend(newPost);
                    deletePost($(' .post-delete-button',newPost));

                    new PostComments(data.data.post._id);
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                
                },
                error:function(error){
                    console.log(error.responseText);
                } 

            });
        });
    }

    let newPostDom= function(post){
        return $(`<li id="post-${post._id}">
                        <p>
                            
                            <small>
                                <a class="post-delete-button" href="/posts/delete/${post._id}">X</a>
                            </small>
                            
                                ${post.content}
                            <small>
                                ${post.user.name}
                                <br>
                            </small>
                        </p>
                        
                        <div id="post-comment">
                        
                            <form id="post-${ post._id }" action="/comment/create" method="post">
                                <input type="text" name="content" placeholder="type to add comment" required>
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit">
                            </form>
                
                            
                        </div>
                
                        <div class="post-comments-list">
                            
                            <ul id="post-comment-${post._id}">
                                
                
                            </ul>
                
                        </div>
            
                    </li>
                `)
        }


        // method yo delete a post
        let deletePost = function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();

                $.ajax({
                    type:'get',
                    url:$(deleteLink).prop('href'),
                    success:function(data){
                        $(`#post-${data.data.post_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Post Deleted",
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                            
                        }).show();
                    },
                    error: function(error){
                        console.log(error.responseText);
                    }
                });
            });
        }
    

        
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .post-delete-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    
    createPost();
    convertPostsToAjax();

}
