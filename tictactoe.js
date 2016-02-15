function estValide(button){
    
    return button.innerHTML.length === 0; // est ce que le bouton a déjà été cliqué ou non (true ou false)

}


function setSymbol(btn, symbole) { // btn sur lequel on a cliqué et et symbole du joueur ayant cliqué 
    
    btn.innerHTML = symbole; // on met le symbole du joueur qui a cliqué sur le bouton
    
} 


function rechercherVainqueur(pions, joueurs, currentTurn){
    
    // un joueur gagne s'il aligne 3 fois son symbole (en tout 8 possibilités en tenant compte des diagonales)
    
    // 3 lignes
    if(pions[0].innerHTML === joueurs[currentTurn] &&
       pions[1].innerHTML === joueurs[currentTurn] &&
       pions[2].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    
    if(pions[3].innerHTML === joueurs[currentTurn] &&
       pions[4].innerHTML === joueurs[currentTurn] &&
       pions[5].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    
    if(pions[6].innerHTML === joueurs[currentTurn] &&
       pions[7].innerHTML === joueurs[currentTurn] &&
       pions[8].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    // 3 colonnes
    if(pions[0].innerHTML === joueurs[currentTurn] &&
       pions[3].innerHTML === joueurs[currentTurn] &&
       pions[6].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    if(pions[1].innerHTML === joueurs[currentTurn] &&
       pions[4].innerHTML === joueurs[currentTurn] &&
       pions[7].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    if(pions[2].innerHTML === joueurs[currentTurn] &&
       pions[5].innerHTML === joueurs[currentTurn] &&
       pions[8].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    
    // 2 diagonales 
    if(pions[0].innerHTML === joueurs[currentTurn] &&
       pions[4].innerHTML === joueurs[currentTurn] &&
       pions[8].innerHTML === joueurs[currentTurn]){

    return true;
        
    }

    if(pions[6].innerHTML === joueurs[currentTurn] &&
       pions[4].innerHTML === joueurs[currentTurn] &&
       pions[2].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    
    if(pions[0].innerHTML === joueurs[currentTurn] &&
       pions[1].innerHTML === joueurs[currentTurn] &&
       pions[2].innerHTML === joueurs[currentTurn]){
    
    return true;
        
    }
    
    
}


function tableauEstRempli(pions){
    for(var i =0, len = pions.length; i<len; i++) { // on va parcourrir les poins pour voir si un est vide
    
        if(pions[i].innerHTML.length === 0) { // si un des éléments n'est pas rempli
            return false; // le tableau n'est pas rempli
        } // fin if   
    } // fin boucle for
        return true; // le tableau est rempli 
} // fin function tableauEstRempli


var Afficheur = function(element) {
    
        var display = element;
    
        function setText (message) { // pour modifier contenu de "element"
        
            display.innerHTML = message;
        }
    
        return {envoiMessage : setText};  // interface pour l'utilisateur 
    };


function main() { // notre fonction principale, nous permet de lancer notre jeu
    

    // déclarion des variables
    var pions = document.querySelectorAll("#jeu button"); // sélection des "button" retourner dans un tableau
    var joueurs = ["X","O"]; // caractères pour nos 2 joueurs : le 1er => lettre "X" et le 2eme lettre "O"     
    var currentTurn = 1;// pour savoir à qui le tour de jouer (0 pour le 1er et 1 pour le 2eme)
    var jeuEstFini = false; // permet de savoir si le jeu est fini ou non
    var affiche = new Afficheur(document.querySelector("#gameStatus")); // référencement de l'élément html "gameStatus"
    
    affiche.envoiMessage("Le jeu peut démarrer. <br/> Joueur " + joueurs[currentTurn] + " c'est votre tour.");

    
    for(var i=0, len = pions.length; i<len; i++) { // boucle pour ajouter un écouteur d'évènements sur chaque pions
        
        pions[i].addEventListener("click", function(){ // sur chaque pion on ajoute un ecouteur d'évènement : click
            
            if(jeuEstFini) { // on test d'abord si le jeu est terminé
                return; // on ne fait rien
                
            }
            if (!estValide(this)) { // si le bouton n'est pas valide, this faisant référence au bouton cliqué
                
                affiche.envoiMessage("Déplacement invalide !");
                
                
            } else{ // si le bouton est valide => on affiche le nom du joueur qui a cliqué
                
                setSymbol(this, joueurs[currentTurn]) // pour savoir quel est l'utilisateur qui a cliqué sur le "button"
                
                jeuEstFini = rechercherVainqueur(pions, joueurs, currentTurn); // fonction qui recherche s'il ya un vainqueur
                
                // 1er cas : jeu fini car un joueur a gagné
                if(jeuEstFini){
                    affiche.envoiMessage("Joueur " + joueurs[currentTurn] + " a gagné !  " + "  <a href=tictactoe.html>Rejouer</a>");
                    return;
                }
                
                // 2eme cas : jeu est fini car Match nul
                if(tableauEstRempli(pions)){
                    
                    affiche.envoiMessage("Match nul !!!  " + "  <a href=tictactoe.html>Rejouer</a>");
                    return; // pour mettre fin au programme et l'empêcher de lacer les instructions suivantes
                }
                
                // 3eme cas : le jeu n'est pas encore fini => c'est au tour du 2nd joueur
                currentTurn = currentTurn ^ 1; // si on a 0, on retourne 1 et on a 1 on retourne 
               
                affiche.envoiMessage("Joueur " + joueurs[currentTurn] + " à votre tour !");
            }
            
                
        })
        
        
    }
    
    
}; // fin fonction main

    
    
main(); // lancement du jeu
