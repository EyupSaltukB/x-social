/* ui screen */

export const ele = {
    user_name : document.querySelector("#user-name"),
    user_tag : document.querySelector("#user-tag"),
    pics : document.querySelectorAll("#profile-pic"),
    tweetsArea : document.querySelector(".tweets-area"),
    logoutBtn : document.querySelector("#logout-btn"),
    main :  document.querySelector("main"),
    searchForm : document.querySelector("aside form"), 
}
// console.log(ele)

// kullanıcı bilgilerini ekrana yansıtır
export const renderUserInfo = (user) => {
    // kullanıcı resimlerini ekrana yansıt
    ele.pics.forEach((img) => (img.src = user.avatar))
    // kullanıcı isimlerini ekrana y.
    ele.user_name.innerText = user.name;
    ele.user_tag.innerText = "@" + user.profile;
}

// tweetin medya içeriğini alacak ve ona göre html oluşturacak
const getMedia = (media) => {
    // console.log(media)
    if(!media) return '';

    // foto medyası var ise
    if(media.photo){
        console.log("forphoto",media.photo)
        return media.photo
        .map((img) => `<img src="${img.media_url_https}"/>`)
        .join('');
    }

    // video var ise
    if(media.video){
        const url = media.video[0]?.variants[0]?.url;
        return `<video controls src="${url}"/>`;
    }

    // medya içeriği yoksa
    return "";
}

// tweetleri ekrana yansıtır
// 1) data : tweetler
// 2) outlet : hangi elementin içine gönderileceği
export const renderTimeline = (data, outlet, user) => {
    //console.log(data)
    // her bir tweet için outlet alanına bir tweet divi yansıt
    outlet.innerHTML = data.timeline.map((tweet) => `
    <div class="tweet">
    <img id="user-img" src="${tweet[user]
      ? tweet[user].avatar
      : '/images/userphoto.png'    
    } " alt="">

    <div class="body">

      <div class="user">
      ${
        tweet[user] ? 
        `
        <a href="?page=user&q=${tweet[user].screen_name}">
          <img id="mobile-img"  src="${tweet[user].avatar }" alt="">
          <b>${tweet[user].name}</b>
          <p>@${tweet[user].screen_name}</p>
          <p>${moment(tweet?.created_at).fromNow()}</p>
        </a>
        `
        : `
        <p>Gönderiyi Yeniden Yayınladı</p>
        `
      }
        <i class="bi bi-three-dots"></i>
      </div>
      
      <a href="?page=status&q=${tweet.tweet_id}" class="content">
        <p>${tweet?.text}</p>
        ${getMedia(tweet.media)}
      </a>
      
      <div class="buttons">
        <button>
          <i class="bi bi-chat"></i>
          <span>${tweet?.replies}</span>
        </button>
        <button>
          <i class="bi bi-arrow-repeat"></i>
          <span>${tweet?.retweets}</span>
        </button>
        <button>
          <i class="bi bi-heart"></i>
          <span>${tweet?.favorites}</span>
        </button>
        <button>
          <i class="bi bi-bookmark"></i>
          <span>${tweet?.bookmarks}</span>
        </button>
      </div>
    </div>
    
  </div>
    `).join("")
}

// parametre olarak aldığı alana yükleniyor... basar
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
  <div id="loader-wrapper">
  <div class="ui-loader loader-blk">
    <svg viewBox="22 22 44 44" class="multiColor-loader">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
    </svg>
</div>
  </div>
`
}

// detay sayfası loadingi
export const renderDetailLoading = (text) => {
  ele.main.innerHTML = `
  <div class="nav">
    <i id="back-btn" class="bi bi-arrow-left"></i>
    <h4>${text}</h4>
</div>

<div id="loader-wrapper">
  <div class="ui-loader loader-blk">
    <svg viewBox="22 22 44 44" class="multiColor-loader">
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
    </svg>
</div>
  </div>
  `
}

// ekrana detay sayfasını yansıt
export const renderDetail = (tweet, user) => {
  console.log(tweet)
  ele.main.innerHTML = `
  <div class="nav">
  <i id="back-btn" class="bi bi-arrow-left"></i>
  <h4>Gönderi</h4>
</div>

<div class="tweet detail-tweet">

<div class="body">
  <div class="user">
    <a href="?page=user&q=${tweet.author.screen_name}">
      <img id="mobile-img" src=${tweet?.author?.image} alt="">
      <b>${tweet.author.name}</b>
      <p>@${tweet.author.screen_name}</p>
    </a>
    <button>Takip Et</button>
  </div>
  <div class="content">
    <p>${tweet?.text}</p>
    ${getMedia(tweet.media)}
  </div>

  <div class="info">
    <p>${tweet.created_at}</p>
    <p>${tweet.views}<span>Görüntülenme</span></p>
  </div>

  <div class="buttons">
    <button>
      <i class="bi bi-chat"></i>
      <span>${tweet.replies}</span>
    </button>
    <button>
      <i class=${tweet.retweets}></i>
      <span>344</span>
    </button>
    <button>
      <i class=${tweet.likes}></i>
      <span>4323</span>
    </button>
    <button>
      <i class=${tweet.bookmarks}></i>
      <span>2433</span>
    </button>
  </div>

</div>

</div>

<form id="comment-form">
<img src=${user.avatar} id="userimg" alt="">
<input type="text" placeholder="Yanıtını Gönder">
<button>Yanıtla</button>
</form>
  `
};

// kullanıcı sayfasını ekrana basar
export const renderUser = (user) => {
  console.log(user)
  ele.main.innerHTML = `
  <div class="user-page">
        <!-- üst kısım -->
        <div class="page-top">
          <div id="nav">
            <i id="back-btn" class="bi bi-arrow-left"></i>
            <div>
              <h3>${user.name}</h3>
              <p>
                <span>${Math.round(Math.random() * 2000)}</span>
                <span>Gönderi</span>
              </p>
            </div>
          </div>

          <!-- banner -->
          <div class="banner">
            <img
              src=${user.header_image}
              alt=""
            />
            <img
              id="user-pp"
              src=${user.avatar}
            />
          </div>

          <!-- butonlar -->
          <div class="buttons">
            <div class="icon">
              <i class="bi bi-three-dots"></i>
            </div>
            <div class="icon">
              <i class="bi bi-envelope"></i>
            </div>
            <button>Takip Et</button>
          </div>

          <!-- kullanıcı bilgileri -->
          <div class="info">
            <h4>
              <span>${user.name}</span>
              ${user.blue_verified && '<i class="bi bi-patch-check-fill"></i>'}
              
            </h4>
            <p class="profile">@${user.profile}</p>

            <p class="description">
              ${user.desc}
            </p>

            <div>
              <a href="#">
                <span>${user.friends}</span>
                <span>Takip Edilen</span>
              </a>
              <a href="#">
                <span>${user.sub_count}</span>
                <span>Takip Edilen</span>
              </a>
            </div>
          </div>

          <!-- butonlar -->
          <div class="input">
            <button class="value">
              
              Gönderiler
            </button>
            <button class="value">
              
              Yanıtlar
            </button>
            <button class="value">
              
              Medya
            </button>
            <button class="value">
              
                <g id="layer1" transform="translate(-33.022 -30.617)">
                  <path
                    fill="#7D8590"
                    id="path26276"
                    d="m49.021 31.617c-2.673 0-4.861 2.188-4.861 4.861 0 1.606.798 3.081 1.873 3.834h-7.896c-1.7 0-3.098 1.401-3.098 3.1s1.399 3.098 3.098 3.098h4.377l.223 2.641s-1.764 8.565-1.764 8.566c-.438 1.642.55 3.355 2.191 3.795s3.327-.494 3.799-2.191l2.059-5.189 2.059 5.189c.44 1.643 2.157 2.631 3.799 2.191s2.63-2.153 2.191-3.795l-1.764-8.566.223-2.641h4.377c1.699 0 3.098-1.399 3.098-3.098s-1.397-3.1-3.098-3.1h-7.928c1.102-.771 1.904-2.228 1.904-3.834 0-2.672-2.189-4.861-4.862-4.861zm0 2c1.592 0 2.861 1.27 2.861 2.861 0 1.169-.705 2.214-1.789 2.652-.501.203-.75.767-.563 1.273l.463 1.254c.145.393.519.654.938.654h8.975c.626 0 1.098.473 1.098 1.1s-.471 1.098-1.098 1.098h-5.297c-.52 0-.952.398-.996.916l-.311 3.701c-.008.096-.002.191.018.285 0 0 1.813 8.802 1.816 8.82.162.604-.173 1.186-.777 1.348s-1.184-.173-1.346-.777c-.01-.037-3.063-7.76-3.063-7.76-.334-.842-1.525-.842-1.859 0 0 0-3.052 7.723-3.063 7.76-.162.604-.741.939-1.346.777s-.939-.743-.777-1.348c.004-.019 1.816-8.82 1.816-8.82.02-.094.025-.189.018-.285l-.311-3.701c-.044-.518-.477-.916-.996-.916h-5.297c-.627 0-1.098-.471-1.098-1.098s.472-1.1 1.098-1.1h8.975c.419 0 .793-.262.938-.654l.463-1.254c.188-.507-.062-1.07-.563-1.273-1.084-.438-1.789-1.483-1.789-2.652.001-1.591 1.271-2.861 2.862-2.861z"
                  ></path>
                </g>
              </svg>
              Beğeni
            </button>
            
          </div>

          <!-- tweetler -->
          <div class="page-bottom">
            <div id="loader-wrapper">
              <div class="ui-loader loader-blk">
                <svg viewBox="22 22 44 44" class="multiColor-loader">
                    <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" class="loader-circle loader-circle-animation"></circle>
                </svg>
            </div>
              </div>
          </div>
        </div>
      </div>
  `
}