async function verifyToken() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Tu dois d'abord te connecter !");
        //window.location.href ='../Home/home.html';
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
          const statut = document.getElementById("stat");
         statut.innerText = "Online";
         statut.style.color ="#9ed70098";
         const photoProfil = document.getElementById("photoProfil");
         photoProfil.style.border =" solid #9ed70098  2px";
         const nom = document.getElementById("Nom");
         nom.innerText = user.nom;

         return user ;
        } else {
          alert("Token expiré ou invalide !");
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

  // Création des sous-éléments
  const contentElem = document.createElement("p");
  contentElem.textContent = libele;
  contentElem.style.margin = "0 0 10px 0";

  const timeElem = document.createElement("small");
  const currentTime = new Date().toLocaleTimeString();
  timeElem.textContent = ` ${currentTime}`;
  timeElem.style.alignSelf = "flex-end";
  timeElem.style.color = "#555";

  // Ajouter le texte et l'heure à la div
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

  console.log("Message envoyé :", libele);
});

