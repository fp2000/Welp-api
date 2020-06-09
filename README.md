#### Operaciones sobre usuarios

- get /users/
- post /user/ (para subir foto de perfil)
- put /user/personalData/:nickName (modifica los datos personales)
- put /user/modifyPassword/:nickName (modifica la contraseña)
- delete /user/delete/:nickName (elimina el usuario)
- get /user/:nickName (encuentra el usuario por nombre de usuario)
- get /user/check/:nickName (compruba si el nombre e usuario está en uso)
- post /user/confirmation/ (confirma el usuario con el id de usuario)



#### Operaciones sobre los posts

  
- post /post (sube un post)
- get /post/:postId (obtiene un post por id)
- put /post/:postId (modifica un post por id)
- delete /post/:postId (elimina un post por id)
- get /posts/recommended/ (obtiene los posts recomendados)
- get /posts/:pos (obtiene 10 posts especificando cuandos posts hay que omitir)
- get /posts/author/:nickName (obtiene los posts por nickName)
- get /post/like/:postId/:nickName (añade un like a un post)

#### Operaciones con los comentarios y respuestas


- get /replys/postId/:postId (encuentra los comentarios con el id del post)
- put /reply/:replyId (modifica el comentario con el id del comentario)
- delete /reply/:replyId (elimina el comentario con el id del comentario)
- get  /replys/nickName/:nickName (encuentra los comentarios de un usuario)
- post /reply/ (añade un comentario)
- post /reply/child/ (añade una respuesta a un comentario)
- put /reply/child/:replyId (modifica una respuesta de un comentario)
- delete /reply/child/:replyId (elimina una respuesta de un comentario)

#### Operaciones con los topicos

- get /topics/ (encuentra todos los topicos)
- post /topic/ (añade un tópico)
