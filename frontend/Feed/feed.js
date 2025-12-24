let actualUser = null;
async function verifyToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href ='../Home/home.html';
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const user = await response.json();
          const nom = document.getElementById("UserNoms");
          nom.textContent = user.noms + " " + user.prenoms ;
          const role = document.getElementById("UserRole")
          role.textContent = user.roles ;
          actualUser = user ;
        
          const plus = document.getElementById("plus");
        if (user.roles !== "Délégué"){
            plus.style.display = "none";
        }

 
          return user ;
        } else {
          localStorage.removeItem("token");
          //window.location.href = '../login/login.html';
        }
      } catch (error) {
        //window.location.href = '../login/iogin.html';
      }
    }

    // Vérifie le token dès que la page se charge
    verifyToken();


  
    


async function getPosts() {
  try {
    const response = await fetch("http://127.0.0.1:8000/getPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Erreur lors du chargement des posts");
      return;
    }

    const container = document.getElementById("posts");
    container.innerHTML = ""; // reset

    // Sécurité : même si l’API renvoie un seul objet
    const posts = Array.isArray(data) ? data : [data];

    posts.forEach(post => {
      const newMsg = document.createElement("div");
      newMsg.classList.add("bubble");

      Object.assign(newMsg.style, {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "20px",
        width: "50vw",
        minHeight: "15vh",
        boxShadow: "0 0 18px 4px rgb(206, 206, 206)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        left: "2vw",
        margin: "20px 0",
        gap: "50px"
      });

      if (window.matchMedia("(max-width: 480px)").matches) {
        newMsg.style.width = "70vw";
      }

      // Nom de l’expéditeur
      const sender = document.createElement("h1");
      sender.textContent = post.nomsSender;
      sender.style.fontSize = "15px";
      sender.style.margin = "0 0 8px 0";

      // Contenu du post
      const content = document.createElement("p");
      content.textContent = post.libele;
      content.style.margin = "0 0 10px 0";

      // Date
      const time = document.createElement("small");
      time.textContent = post.date || new Date().toISOString().split("T")[0];
      time.style.alignSelf = "flex-end";
      time.style.color = "#555";

      newMsg.append(sender, content, time);
      container.appendChild(newMsg);
    });

  } catch (err) {
    console.error("Erreur réseau :", err);
  }
}

// Chargement automatique au refresh
getPosts();

document.getElementById("pfl").addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("main").style.display = "none";
  document.getElementById("profil").style.display = "flex";
  document.getElementById("nomPage").textContent = "Profil";
  document.getElementById("hm").style.color = "rgb(172, 215, 252)";
  document.getElementById("pfl").style.color = "#fff";
});

document.getElementById("hm").addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("main").style.display = "flex";
  document.getElementById("profil").style.display = "none";
  document.getElementById("nomPage").textContent = "Accueil";
  document.getElementById("pfl").style.color = "rgb(172, 215, 252)";
  document.getElementById("hm").style.color = "#fff";
});

