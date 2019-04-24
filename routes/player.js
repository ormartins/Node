<% include header.ejs %>
        <span class="navbar-brand mb-0 h1" ><a href="/players">Liste des joueurs</a></span>
        <a class="float-right" href="/add" title="Add a New Player">Ajouter un joueur</a>
    <div class="table-wrapper">
        <% if (joueurs.length > 0) {%>
            <table class="table table-hovered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Score</th>
                        <th scope="col">Classement</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <% joueurs.forEach((joueur, index) => { %>
                        <tr>
                            <th scope="row"><%= joueur.id %></th>
                            <td><%= joueur.nom %></td>
                            <td><%= joueur.prenom %></td>
                            <td><%= joueur.score %></td>
                            <td><%= joueur.classement %></td>
                            <td>
                                <a href="/edit/<%= joueur.id %>" target="_blank" rel="noopener" class="btn btn-sm btn-success">Modifier</a>
                                <a href="/delete/<%= joueur.id %>" class="btn btn-sm btn-danger">Supprimer</a>
                            </td>
                        </tr>
                    <% }) %>
                </tbody>
            </table>
        <% } else { %>
            <p class="text-center">Aucun joueur trouvé, allez <a href="/add" >ici</a> pour ajouter un joueur.</p>
        <% } %>
    </div>
</div>
</body>
</html>
