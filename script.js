// Récupération des événements via fetch et affichage des cartes

fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let scrollEventsContainer = document.getElementById(
      "scrollEventsContainer"
    );

    data.events.forEach(function (event) {
      let eventCard = document.createElement("div");
      eventCard.className = "eventCard";
      eventCard.setAttribute("data-event-id", event.id);

      let eventTitle = document.createElement("h3");
      eventTitle.className = "eventTitle";
      eventTitle.innerHTML = event.title;

      let eventDate = document.createElement("p");
      eventDate.className = "eventDate";
      let dateParts = event.start_date.split(" ")[0].split("-");
      eventDate.textContent =
        "Date: " + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

      let eventAdress = document.createElement("p");
      eventAdress.className = "eventAdress";
      if (event.venue.slug !== undefined && event.venue.slug !== null) {
        eventAdress.textContent = "Lieu: " + event.venue.slug;
      } else {
        eventAdress.textContent = "Lieu: non communiqué";
      }

      let detailsButton = document.createElement("button");
      detailsButton.className = "detailsButton";
      detailsButton.textContent = "Voir détails";
      detailsButton.addEventListener("click", function () {
        displayModal(event);
      });

      let planningButton = document.createElement("button");
      planningButton.className = "planningButton";
      planningButton.textContent = "Ajouter au planning";
      planningButton.addEventListener("click", function () {
        addToPlanning(event.id);
      });

      eventCard.appendChild(eventTitle);
      eventCard.appendChild(eventDate);
      eventCard.appendChild(eventAdress);
      eventCard.appendChild(detailsButton);
      eventCard.appendChild(planningButton);
      scrollEventsContainer.appendChild(eventCard);
    });
  })
  .catch(function (error) {
    console.error("Erreur API :", error);
  });

// Fonction d'ajout au planning

function addToPlanning(eventId) {
  let plannedEvents = localStorage.getItem("plannedEvents");

  if (plannedEvents !== null) {
    plannedEvents = JSON.parse(plannedEvents);
  } else {
    plannedEvents = [];
  }

  if (plannedEvents.includes(eventId) === false) {
    plannedEvents.push(eventId);
    localStorage.setItem("plannedEvents", JSON.stringify(plannedEvents));
    displayPlanning();
  }
}

// Affichage des événements du planning

function displayPlanning() {
  let plannedEvents = localStorage.getItem("plannedEvents");

  if (plannedEvents !== null) {
    plannedEvents = JSON.parse(plannedEvents);
  } else {
    plannedEvents = [];
  }

  let scrollPlanningContainer = document.getElementById(
    "scrollPlanningContainer"
  );
  scrollPlanningContainer.innerHTML = "";

  fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      plannedEvents.forEach(function (eventId) {
        let event = null;

        for (let i = 0; i < data.events.length; i++) {
          if (data.events[i].id === eventId) {
            event = data.events[i];
            break;
          }
        }

        if (event !== null) {
          let eventCard = document.createElement("div");
          eventCard.className = "eventCardClone";

          let eventTitle = document.createElement("h3");
          eventTitle.className = "eventTitle";
          eventTitle.innerHTML = event.title;

          let eventDate = document.createElement("p");
          eventDate.className = "eventDate";
          let dateParts = event.start_date.split(" ")[0].split("-");
          eventDate.textContent =
            "Date: " + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

          let eventAdress = document.createElement("p");
          eventAdress.className = "eventAdress";
          if (event.venue.slug !== undefined && event.venue.slug !== null) {
            eventAdress.textContent = "Lieu: " + event.venue.slug;
          } else {
            eventAdress.textContent = "Lieu: non communiqué";
          }

          let detailsButton = document.createElement("button");
          detailsButton.className = "detailsButton";
          detailsButton.textContent = "Voir détails";
          detailsButton.addEventListener("click", function () {
            displayModal(event);
          });

          let removeButton = document.createElement("button");
          removeButton.className = "removeButton";
          removeButton.textContent = "Retirer du planning";
          removeButton.addEventListener("click", function () {
            eventCard.remove();
            removeFromPlanning(event.id);
          });

          eventCard.appendChild(eventTitle);
          eventCard.appendChild(eventDate);
          eventCard.appendChild(eventAdress);
          eventCard.appendChild(detailsButton);
          eventCard.appendChild(removeButton);
          scrollPlanningContainer.appendChild(eventCard);
        }
      });
    })
    .catch(function (error) {
      console.error("Erreur API :", error);
    });
}

window.addEventListener("load", displayPlanning);

// Suppression d'un événement du planning

function removeFromPlanning(eventId) {
  let plannedEvents = localStorage.getItem("plannedEvents");

  if (plannedEvents !== null) {
    plannedEvents = JSON.parse(plannedEvents);

    let updatedEvents = [];
    for (let i = 0; i < plannedEvents.length; i++) {
      if (plannedEvents[i] !== eventId) {
        updatedEvents.push(plannedEvents[i]);
      }
    }

    localStorage.setItem("plannedEvents", JSON.stringify(updatedEvents));
  }

  displayPlanning();
}

// Affichage et fermeture de la modale

function displayModal(event) {
  document.getElementById("modalTitle").innerHTML = event.title;
  let dateParts = event.start_date.split(" ")[0].split("-");
  document.getElementById("modalDate").textContent =
    "Date: " + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  document.getElementById("modalAdress").textContent =
    "Lieu: " + event.venue.slug;
  document.getElementById("modalDescription").innerHTML =
    event.description || "Pas de description disponible.";
  document.getElementById("modal").style.display = "block";

  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });
}

// Gestion du mode Sombre

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

const darkModeImage = document.querySelector(".darkModeImage");
const body = document.body;

const savedTheme = getCookie("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

darkModeImage.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const newTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  setCookie("theme", newTheme, 365);
  console.log(getCookie("theme"));
});
