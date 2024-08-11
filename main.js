// local storage'dan kullanıcı bilgilerini al
import API from "./scripts/api.js";
import { getLocal } from "./scripts/helper.js";
import {
  ele,
  renderUserInfo,
  renderTimeline,
  renderLoader,
  renderDetailLoading,
  renderDetail,
  renderUser
} from "./scripts/ui.js";

const user = getLocal("user");
// console.log(user)

// kullanıcının hangi sayfayı göreceğine karar veren fonks.
// ekranın orta kısmında yer alacak html kodunu belirler

const router = () => {
  // url'deki arama parametrelerine erişme

  //console.log(location.search);
  const params = new URLSearchParams(location.search);
  //console.log("params",params)
  const page = params.get("page");
  const query = params.get("q");

  console.log(page, query);

  // page değerine göre arayüzü ekrana yansıtma
  switch (page) {
    // tweet detay
    case "status":
      // loading ekrana yansıt
      renderDetailLoading("Gönderi");

      // tweet detaylarını API'dan al
      API.getData(`tweet.php?id=${query}`)
      // ekrana detay sayfasını yansıt
      .then((data) => renderDetail(data, user));
      break;

    // arama sayfası
    case "search":
      renderDetailLoading(`${query} için sonuçlar`);

      API.getData(`search.php?query=${query}&search_type=top`)
      .then((data) => renderTimeline(data, ele.main, "user_info"))
      break;

    // kullanıcı detay sayfası
    case "user":
    // sayfanın yüklendiğinin belirtilmesi  
    renderDetailLoading(query);

    // kullanıcı bilgilerini API'den aktar
    API.getUser(query)
    .then((user) => {
      // hesap bilgilerini ekrana yansıt
    renderUser(user) 
      // tweetlerin geleceği yeri belirleme
      const outlet = document.querySelector(".page-bottom")
      // atılan tweetleri al
      API.getData(`timeline.php?screenname=${query}`)
      .then((data) => renderTimeline(data, outlet, "author"))
    })

      break;

    // varsayılan olarak anasayfayı ekrana yansıtma
    default:
      // tweetler yüklenmeden loading... bas
      renderLoader(ele?.tweetsArea);

      // kullanıcı tweetlerine eriş
      API.getData(`timeline.php?screenname=${user?.profile}`)
        // tweetleri ekrana yansıt
        .then((data) => renderTimeline(data, ele?.tweetsArea, "author"));
  }
};

// sayfa yüklendiğinde kullanıcının bilgilerini ekrana yansıt
document.addEventListener("DOMContentLoaded", () => {
  // kullanıcı oturum açtığında
  if (user) {
    renderUserInfo(user);
  } else {
    // oturum açmadıysa logine yönlendir (authorization )
    location = "/auth.html";
  }

  // ekrana yansıtılacak sayfayı belirle
  router();
});

// çıkış yap butonuna tıklanınca oturumu kapat
ele.logoutBtn.addEventListener("click", () => {
  // localstorage'dan user'ı kaldır
  localStorage.removeItem("user");

  // sonrasında da logine yönlendir
  location = "/auth.html";
});

// geri butonuna tıklanma olayı
ele.main.addEventListener("click", (e) => {
    if(e.target.id === "back-btn"){
        // bir adım geri git
        history.back()
    }
})

// arama formunun gönderilmesini izle
ele.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // formdaki veriye erişme
  const query = e.target[0].value;
  //console.log(query)

  // sayfayı değil
  location = `?page=search&q=${query}`;
})