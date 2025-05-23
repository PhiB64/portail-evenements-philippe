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
      planningButton.className = "planningButton";
      planningButton.textContent = "Ajouter au planning";

      const removeButton = document.createElement("button");
      removeButton.className = "removeButton";
      removeButton.textContent = "Retirer du planning";

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
        modalTitle.innerHTML = event.title;
        modalDate.textContent = newFormatDate;
        modalAdress.textContent = `Lieu: ${event.venue.slug}`;
        modalDescription.innerHTML = event.description;
        modal.style.display = "block";

        const closeButton = document.getElementById("closeModal");
        closeButton.addEventListener("click", () => {
          modal.style.display = "none";
        });
      });

      planningButton.addEventListener("click", () => {
        const scrollPlanningContainer = document.getElementById(
          "scrollPlanningContainer"
        );

        const existingEvent = scrollPlanningContainer.querySelector(
          `[data-event-id="${event.id}"]`
        );

        if (!existingEvent) {
          const eventCardClone = eventCard.cloneNode(true);

          eventCardClone.removeAttribute("id");
          eventCardClone.setAttribute("data-event-id", event.id);
          eventCardClone.className = "eventCardClone";

          eventCardClone.querySelector(".planningButton").remove();
          eventCardClone.appendChild(removeButton);
          removeButton.addEventListener("click", () => {
            eventCardClone.remove();
          });

          const detailsButtonClone =
            eventCardClone.querySelector(".detailsButton");
          detailsButtonClone.addEventListener("click", () => {
            const modalTitle = document.getElementById("modalTitle");
            const modalDate = document.getElementById("modalDate");
            const modalAdress = document.getElementById("modalAdress");
            const modalDescription =
              document.getElementById("modalDescription");

            modalTitle.innerHTML = event.title;
            modalDate.textContent = newFormatDate;
            modalAdress.textContent = `Lieu: ${event.venue.slug}`;
            modalDescription.innerHTML = event.description;

            document.getElementById("modal").style.display = "block";

            const closeButton = document.getElementById("closeModal");
            closeButton.addEventListener("click", () => {
              modal.style.display = "none";
            });
          });

          scrollPlanningContainer.appendChild(eventCardClone);
        }
      });
    });
  })

  .catch((error) => console.error("Erreur API :", error));

const darkModeImage = document.querySelector(".darkModeImage");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

darkModeImage.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
  );
});
