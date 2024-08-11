import API from "./api.js";
import { setLocal } from "./helper.js";

/* login */

const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameWarn: document.querySelector(".name-warning"),
  passWarn: document.querySelector(".pass-warning"),
};

/* ! şifre belirleme kuralları
  En az sekiz karakter, 
  en az bir büyük harf, bir küçük harf, 
  bir sayı ve 
  bir özel karakter
*/
const regex = "((?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?=*&]).{8,16})";

// isim ve şifrenin kontrol durumları
// isim veya şifrede problem varsa uyarı yansıtılıp
// false döndürülecek
// problem yoksa true
const checkValues = (name, pass) => {
  let isNameError = false;
  let isPassError = false;

  // isim kontrol ve hata durumları
  if (!name.trim()) {
    isNameError = true;
    authEle.nameWarn.innerHTML =
      "<p class='warning' >İsim alanı boş bırakılamaz!<p>";
  } else {
    authEle.nameWarn.innerHTML = "";
  }

  // şifre kontrol ve hata durumları
  if (!pass.trim()) {
    isPassError = true;
    authEle.passWarn.innerHTML = "<p>Şifre alanı boş bırakılamaz!<p>";
  } else if (pass.length < 8) {
    isPassError = true;
    authEle.passWarn.innerHTML = "<p>Şifre en az 8 karakter olmalıdır!<p>";
  } else if (!pass.match(regex)) {
    isPassError = true;
    authEle.passWarn.innerHTML = "<p>Şifre yeterince güçlü değil!<p>";
  } else {
    authEle.passWarn.innerHTML = "";
  }

  // fonksiyonun döndüreceği değere karar verme
  if (isPassError || isNameError) {
    return false;
  } else {
    return true;
  }
};

// form submit olayını dinleme
authEle.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // değerlere erişme
  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  /*  console.log(name, pass) -- (kontrol) */
  // name ve pass yukarıdaki fonksiyona parametre olarak gönderildi.
  //console.log("API REQUEST")

  // inputlardaki koşullar sağlanırsa kullanıcı bilgileri alınır.
  // hata yoksa kullanıcı bilgilerini al
  if (checkValues(name, pass)) {
    //console.log("API contact")
    API.getUser(name)
      .then((data) => {
        // kullanıcı bulunamadıysa uyarı ver
        if(data.status === "error"){
            authEle.nameWarn.innerHTML = "<p>Kullanıcı bulunamadı!<p>"
        } else {
            // kullanıcı bulunduysa l.storage'a kaydet ve anasayfaya yönlendir
            // console.log(data)
            setLocal("user", data);
            // jsde yönlendirme için location kullanıldı (anasayfaya yönlendir)
            location = "/";
        }
      })
      .catch((err) => console.log(err));
  }
});