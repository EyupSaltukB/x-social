// local storage'e veri kaydeder
// locale kaydedilen veriler string tipinde olmalı
export const setLocal = (key, value) => {
    // string'e çevir
    const strData = JSON.stringify(value);

    // locale kaydet
    localStorage.setItem(key, strData);
};


// localden veri al
export const getLocal = ( key) => {
    // localden veriye eriş 
    const strData = localStorage.getItem(key);

    // stringi js verisine çevirmek için
    return JSON.parse(strData);
}