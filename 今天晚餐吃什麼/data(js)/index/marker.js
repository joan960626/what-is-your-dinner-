function Expandplaces(Places) {
const Expandedplaces = [];

  Places.forEach(Place => {
    if (Array.isArray(Place.branches)) {
      Place.branches.forEach((Branch, Index) => {
        Expandedplaces.push({
          ...Place,
          ...Branch,

          name:
            Place.branches.length > 1
              ? `${Place.name} ${Index + 1}`
              : Place.name,

          mainName: Place.name,

          branchIndex:
            Index + 1
        });
      });
    } else {
      Expandedplaces.push(Place);
    }
  });

  return Expandedplaces;
}

window.Placemarkers = [];
window.placeMarkers = window.Placemarkers;

//匯入餐廳資料庫，並設置成地標
const Allplaces = Expandplaces([
//Expandplaces把飲料店分店拆開
  ...(window.Restaurants || []).map(Place => ({
    ...Place,
  //把餐廳資料庫放進陣列中
    Placetype: "restaurant"
    //幫這筆資料分類(到resturant)
  })),

  ...(window.Drinks || []).map(Place => ({
    ...Place,
  //把飲料資料庫也放進同個陣列中
    Placetype: "drink"
    //幫這筆資料分類(到drink)
  }))
]);

//初始地標(高師大燕巢校區)
L.marker(
  [22.782629, 120.403790],
  {
    icon: window.Playericon
  }
)
  .addTo(window.Map)
  .bindPopup("養老院");

Allplaces.forEach(Place => {
//跑過所有店家
  if (!Place.lat || !Place.lng) return;
  //跳過沒有座標的店家

  const Defaulticon =
    Place.Placetype === "drink"
      ? window.Drinkicon
      : window.Restauranticon;
  //判斷icon，如果是飲料就用drinkicon，反之則resturanticon

  const Activeicon =
    Place.Placetype === "drink"
      ? window.Drinkiconactive
      : window.Restauranticonactive;
  //判斷如果icon被點擊，亮起來

  const Marker = L.marker(
    [Place.lat, Place.lng],
    {
      icon: Defaulticon
    }
  )
  //建立地標
    .addTo(window.Map)
    //加到地圖，顯示出來
    .bindTooltip(
    //游標滑過去會顯示名稱
      Place.name,
      {
        direction: "top",
        offset: [0, -20],
        opacity: 0.95
      }
    );

  Marker.placeData = Place;
  //把店家資料綁進marker裡面

  window.Placemarkers.push(
    Marker
  );

  Marker.on("click", () => {
  //當我點擊某個marker時
    window.Placemarkers.forEach(
      Othermarker => {
        const Otherplace =
          Othermarker.placeData;

        if (!Otherplace) return;

        const Reseticon =
          Otherplace.Placetype === "drink"
            ? window.Drinkicon
            : window.Restauranticon;

        Othermarker.setIcon(
        //變大(亮起來)
          Reseticon
        );
      }
    );

    Marker.setIcon(
      Activeicon
    );

    Opensidebar(
    //打開側邊攔
      Place
    );
  });
});

Setupareafilter();
//建立篩選器，並篩選地標

const Markerparams =
  new URLSearchParams(
    window.location.search
  );

const Markerskipcover =
  Markerparams.get("map");
//取出map

if (Markerskipcover === "true") {
//如果是抽籤回來
  Gotoselectedplacefromlottery();
  //自動定位到抽到的地標
} else {
  localStorage.removeItem(
    "Selectedplacename"
  );
  //清掉上次抽到的內容
}