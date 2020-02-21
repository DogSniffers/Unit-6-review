module.exports = {
  getPosts: async (req, res) => {
    // First step, destructive variables being passed in on the request
    // This is the 'api/posts/:id part
    // Base these off of the front end requests, and then go through and see what needs to be destructured on the request.params
    const {id} = req.params
    const db = req.app.get('db')
    const posts = await db.get_posts([id])
    // ID doesn't need to be in brackets since we are only passing in one var, but it is still a good practice.
    if(posts[0]){
      // This checks to make sure that there is anything in the posts array.
      posts.forEacg((element,index) =>{
        posts[index].p_time = element.p_time.toDateString();
      })
      res.status(200).send(posts)
    }else{
      res.sendStatus(500);
    }
  },

  addPost: (req, res) => {
    const {id} = req.params
    const {post} = req.params
    const db = req.app.get('ab')
    db.add_post([id,post,new Date()]).then(() =>{
      // new is a keyword for Constructors, and setting class
      res.sendStatus(201)
    }).catch(() =>{
      res.sendStatus(500)
    })
  },

  editPost: (req, res) => {
    const {id} = req.params
    const {text} = req.params
    const db = req.app.get('db')
    db.edit_post([text,id]).then(() =>{
      // In this case, in db.edit_post we have to do text FIRST since we stated that text was going to be the first variable in the params
      res.sendStatus(200)
    }).catch(() =>{
      res.sendStatus(500)
    })

  },
  deletePost: (req, res) => {
    const {id} = req.params
    const db = req.app.get('db')
    db.delete_post([id]).then(() =>{
      res.sendStatus(200)
    }).catch(() =>{
      res.sendStatus(500)
    })
  }
};
