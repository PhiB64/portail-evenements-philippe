fetch("https://demo.theeventscalendar.com/wp-json/tribe/events/v1/events")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.events);

    data.events.forEach((event) => {
      const scrollEventsContainer = document.getElementById(
        "scrollEventsContainer"
      );
      const eventCard = document.createElement("div");
      eventCard.id = "eventCard";

      const detailsButton = document.createElement("button");
      detailsButton.className = "detailsButton";
      detailsButton.textContent = "Voir détails";

      const planningButton = document.createElement("button");
      planningButton.id = "planningButton";
      planningButton.textContent = "Ajouter au planning";

      const eventTitle = document.createElement("h3");
      eventTitle.id = "eventTitle";
      eventTitle.innerHTML = event.title;

      const [year, month, day] = event.start_date.split(" ")[0].split("-");
      const newFormatDate = `Date: ${day}-${month}-${year}`;

      const eventDate = document.createElement("p");
      eventDate.id = "eventDate";
      eventDate.textContent = newFormatDate;

      const eventAdress = document.createElement("p");
      eventAdress.id = "eventAdress";
      eventAdress.textContent = `Lieu: ${event.venue.slug}`;

      scrollEventsContainer.appendChild(eventCard);
      eventCard.appendChild(eventTitle);
      eventCard.appendChild(eventDate);
      eventCard.appendChild(eventAdress);
      eventCard.appendChild(detailsButton);
      eventCard.appendChild(planningButton);

      detailsButton.addEventListener("click", () => {
        const modalTitle = document.getElementById("modalTitle");
        const modalDate = document.getElementById("modalDate");
        const modalAdress = document.getElementById("modalAdress");
        const modalDescription = document.getElementById("modalDescription");
        modalTitle.textContent = event.title;
        modalDate.textContent = newFormatDate;
        modalAdress.textContent = `Lieu: ${event.venue.slug}`;
        modalDescription.innerHTML = event.description;
      });
    });
  })

  .catch((error) => console.error("Erreur API :", error));
