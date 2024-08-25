import Route from "./Route";
import { allRoute, websiteName } from "./allRoute";
import { elements } from "chart.js";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

//Création d'une route pour pages introuvables errour 404
const route404 = new Route ("404", "Page introuvable", "/pages/404.html");

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (URL) => {
    let currentRoute = null;
    //Parcours de toutes les routes pour trouver la correspondence
    allRoute.forEach((element) => {
        if (element.url == url ) {
            currentRoute = element;
        }
    });

    //Si aucune correspondance n'est trouvée, on retourne la route erreur404
        if (currentRoute != null ) {
            return currentRoute;
        } else {
            return route404;
        }
};
//Fonction pour charge le contenu de la page 
const LoadContentPage = async () => {
    const path = window.location.pathname;
    //Recuperation URL actuelle
    const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
    //Ajout du contenu Html à l'élément avec l'ID "main-page"
    document.getElementById("main-page").innerHTML = html;
    //Ajout de contenu JS
    if (actualRoute.pathJS != "") {
        //creation d'une balise scrip :
        var scriptTag = document.createElement("script");
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", actualRoute.pathJS);
        //Ajout de la balise script au corps du document
        document.querySelector("body").appendChild(scriptTag);
    }
    document.title = actualRoute.title + " - " + websiteName;
};
//Fonction pou gérer les événements de routage (Ex: clic sur les liens) :
const routeEvent = (Event) => {
    Event = Event || window.Event;
    Event.preventDefault();
    //Mise à jour de l'Url dans l'historique du navegateur 
    window.history.pushState({}, "", event.target.href);
    //Chargement du contenu de la nouvelle page 
    LoadContentPage();
};
// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
//Asignation de la fonction routeEventà la propiété route de la fonêtre 
window.Route = routeEvent;
//Chargement du contenu de la page au chargement initial 
LoadContentPage();

