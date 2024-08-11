/* api requests */

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "89583f0ffemshe4cb569c3a6f223p1f08e5jsn827dc9e381cc",
    "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
  },
};

export default class API {
  // kullanıcı ismine hesap bilgilerine erişme
  static async getUser(username) {
    // verileri al
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );
    // json verilerini js verilerine çevirme
    const data = await res.json();

    // veriyi fonksiyonun çağrıldığı yere gönder
    return data;
  }

  // tweetleri alma işlemi
  // gönderdiğimiz endpointteki verileri alır
  static async getData(endpoint){
    try{

    // parametre olarak gelen uç noktaya istek
    const res = await fetch(`https://twitter-api45.p.rapidapi.com/${endpoint}`, 
    options
    );
    // gelen veriyi döndür
    return await res.json();
  } catch(err) {
    console.log("hata bulundu!", err)

  }
  }
}
