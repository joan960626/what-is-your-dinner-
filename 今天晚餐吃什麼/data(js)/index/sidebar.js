function Opensidebar(Place) {
  const Sidebar =
    document.getElementById(
      "Sidebar"
    );

  Sidebar.classList.remove(
    "Hidden"
  );

  Sidebar.innerHTML = `
    <button
      id="Closebtn"
      type="button"
    >
      ✕
    </button>

    <h2>
      ${Place.name}
    </h2>

    <p>
      💰 ${
        Place.money || "未提供"
      }
    </p>

    <p>
      📍 ${
        Place.where || "未提供"
      }
    </p>

    <p>
      📝 ${
        Place.what || "未提供"
      }
    </p>

    <button
      id="Favoritebtn"
      class="Favoritebtn"
      type="button"
    >
      ${
        Isfavorite(
          Place.name
        )
          ? "⭐ 已收藏"
          : "☆ 收藏"
      }
    </button>

    ${
      Place.link
        ? `
          <a
            href="${Place.link}"
            target="_blank"
            class="Linkbtn"
          >
            Google Map
          </a>
        `
        : ""
    }
  `;

  document
    .getElementById(
      "Closebtn"
    )
    .addEventListener(
      "click",
      () => {

        Sidebar.classList.add(
          "Hidden"
        );

        window.Placemarkers.forEach(
          Marker => {

            const Markerplace =
              Marker.placeData;

            if (
              !Markerplace
            ) return;

            const Reseticon =
              Markerplace.Placetype ===
              "drink"
                ? window.Drinkicon
                : window.Restauranticon;

            Marker.setIcon(
              Reseticon
            );

          }
        );

      }
    );

  document
    .getElementById(
      "Favoritebtn"
    )
    .addEventListener(
      "click",
      () => {

        Togglefavorite(
          Place.name
        );

      }
    );
}

window.Opensidebar =
  Opensidebar;