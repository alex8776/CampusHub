document.getElementById("login").addEventListener("click", async (e) => {
     e.preventDefault();
     const idEtudiant = document.getElementById("idEtudian").value;
     const passw = document.getElementById("passw").value;
     

     if(idEtudian ==="" || passw ==="" ){
        document.getElementById("errorMsg").textContent = "Vérifiez que tout les champs sont bien remplis !";
        return;
    }


    try{
        const response = await fetch("http://127.0.0.1:8000/autentification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idEtudiant, passw })
        });

        const data = await response.json();

        if(!response.ok){
            document.getElementById("errorMsg").textContent = data.detail
        }else{
            //alert(`${nom}, nous sommes ravis de vous revoir !`);
            localStorage.setItem("token", data.access_token);
            window.location.href = "../LogoLogInAdmin.html";
        }
        


    }catch (err) {
        console.error("Erreur Réseau :", err);
        alert("Impossible de contacter le serveur !");

    }

    });
