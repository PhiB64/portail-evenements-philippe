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
      detailsButton.id = "detailsButton";
      detailsButton.textContent = "Voir détails";

      const planningButton = document.createElement("button");
      planningButton.id = "planningButton";
      planningButton.textContent = "Ajouter au planning";

      const eventTitle = document.createElement("h3");
      eventTitle.id = "eventTitle";
      eventTitle.innerHTML = event.title;

      const [year, month, day] = event.start_date.split(" ")[0].split("-");
      const newFormatDate = `${day}-${month}-${year}`;

      const eventDate = document.createElement("p");
      eventDate.id = "eventDate";
      eventDate.textContent = newFormatDate;

      scrollEventsContainer.appendChild(eventCard);
      eventCard.appendChild(eventTitle);
      eventCard.appendChild(eventDate);
      eventCard.appendChild(detailsButton);
      eventCard.appendChild(planningButton);
    });
  })
  .catch((error) => console.error("Erreur API :", error));
