#### Operaciones que deben de poder hacer todos los usuarios

- get /user/:nickname
- get /post/:postId
- get /posts/:limit
- get /replys/:postId
- get /childReplys/:postId/:parentReplyId
- get /topics/
- post /user/ (para crear un usuario nuevo)

#### Operaciones que deben de poder hacer los usuarios registrados

- todas las anteriores mas:
- post /post/
- post /reply/


#### Operaciones que deben de poder hacer ciertos usuarios

- todas las anteriores mas:
- put /user/:userId (solo se podrá modificar el nombre y el apellido (y si se añade la foto de perfil))
- put /post/:post (solo se podrá modificar el hilo si lo ha creado el usuario)
- put /reply/:replyId (solo se podrá modificar la respuesta si lo ha creado el usuario)
- las peticiones put servirán para eliminar los hilos, los usuarios y las respuestas, ya que se ocultarán, el administrador es el único que puede eliminarlos


#### Operaciones que debe hacer el administrador

- todas las anteriores mas:
- post /admin/topic/
- put /admin/topic/:topicId
- delete /admin/topic/:topicId
- delete /admin/user/:userId
- delete /admin/post/:postId
- delete /admin/reply/:replyId
