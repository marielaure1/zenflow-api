# Authentification

- Pour s'authentifier, il faut un email et un mot de passe que nous stockons dans le schema "Users".

- Pour s'inscrire, selon si on est un client ou un membre de l'équipe, on va créer un email avec un mot de passe par default contenant un code qui permettra plutard de savoir si un utilisateurs à créer son mot de passe ou pas, un status pour savoir si son email est vérifier, ou si la personne est bloqué et un token pour le lien de vérification de l'email.

- Chaque utilisateur à un role : 
-> MEGA_ADMIN
-> SUPER_ADMIN
-> ADMIN
-> MANAGER
-> EMPLOYEE
-> GUEST

- Chque utilisateur à un ou plusieurs domaines, permissions et métiers:
-> Domains
-> Permissions
-> Jobs

- Un role a par défault un ou plusieurs domaines, chaque domaines a un ou plusieurs métiers, chaque métiers a par défault plusieurs permissions.

- Les permissions on chacun un code qui donne accès à son contenu