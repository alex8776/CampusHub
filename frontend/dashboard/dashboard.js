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
          const nom = document.getElementById("user");
          nom.textContent = user.noms ;
          actualUser = user ;

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

  document.getElementById("sendPost").addEventListener("click", (e) => {
  e.preventDefault();
async function poster() {

  const PostInput = document.getElementById("newPost");
  const libele = PostInput.value.trim();
  const msgMain = document.getElementById("Post");

  if (!libele) return;

  // Création de la div principale
  const newMsg = document.createElement("div");
  newMsg.classList.add("bubble");
  Object.assign(newMsg.style, {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    flex: "1",
    width: "50vw",
    minHeight: "15vh",
    boxShadow: "0 0 18px 4px rgb(206, 206, 206)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    left: "2vw",
    margin: "10px 0",
  });
  if (window.matchMedia("(max-width: 480px)").matches) {
      newMsg.style.width = "80vw";
    }

  // Création des sous-éléments
  const contentElem = document.createElement("p");
  contentElem.textContent = libele;
  contentElem.style.margin = "0 0 10px 0";

  const timeElem = document.createElement("small");
  const currentTime = new Date().toISOString().split("T")[0];
  timeElem.textContent = ` ${currentTime}`;
  timeElem.style.alignSelf = "flex-end";
  timeElem.style.color = "#555";

  const Sender = document.createElement("h1");
  Sender.textContent = actualUser.noms;
  Sender.style.alignSelf = "flex-start";
  Sender.style.fontSize = "15px"

  // Ajouter le texte et l'heure à la div
  newMsg.appendChild(Sender);
  newMsg.appendChild(contentElem);
  newMsg.appendChild(timeElem);
  

  // Afficher le conteneur si caché
  msgMain.style.display = "flex";

  // Ajouter le post
  msgMain.appendChild(newMsg);

  // Nettoyer l’input
  PostInput.value = "";

  // Scroll auto si nécessaire
  msgMain.scrollTop = msgMain.scrollHeight;

  const idSender = actualUser.idEtudiant;
  const nomsSender = actualUser.noms;
  const dateSende = new Date().toISOString().split("T")[0];
  const roleSender = actualUser.role;
  console.log(roleSender);

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/postSend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ libele, idSender, nomsSender })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Erreur lors de l’envoi du message.");
    }

    console.log("Message envoyé :", libele);


  } catch (err) {
    console.error("Erreur Réseau :", err);
    alert("Impossible de contacter le serveur !");
  }
}

poster();
});



