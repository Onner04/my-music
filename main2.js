const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const playlist=$('.playlist')
const audio = $('#audio')
const heading= $('header h2')
const cdThumb =$('.cd-thumb')
const cd = $('.cd')
const playBtn =$('.btn-toggle-play')
const player=$('.player')
const progress=$('#progress')
const nextBtn=$('.btn-next')
const prevBtn=$('.btn-prev')
const repeatBtn=$('.btn-repeat')
/**
 * render
 * scrool top
 * play/pause/seek
 * cd rotate
 * next/prev
 * next/repeat when end
 * active song
 * scroll active song into view
 * play song when click
 */



const app={
    currentIndex : 0,
    isPlaying: false,

   
    songs:[
        {
            name: 'chúng ta của tương lai vs nâng chén tiêu sầu ' ,
            singer: 'stmtp',
            path: './access/music/Chúng Ta Của Tương Lai ft Nâng Chén Tiêu Sầu.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'Mưa đợi chờ ' ,
            singer: 'Miu Lê',
            path: './access/music/MƯA ĐỢI CHỜ.mp3',
            image: './access/img/img-5.webp'
        },
        {
            name: 'bé ơi từ từ remix ' ,
            singer: 'ZonWAVE',
            path: './access/music/Bé Ơi Từ Từ.mp3',
            image: './access/img/tutu.webp'
        },
        {
            name: 'Khóc trong club' ,
            singer: 'HIỀN HỒ x ORINN x NGHIABE',
            path: './access/music/KHÓC Ở TRONG CLUB.mp3',
            image: './access/img/img-3.webp'
        },
        {
            name: 'Body Shaming' ,
            singer: 'Choco Trúc Phương',
            path: './access/music/BODY SHAMING.mp3',
            image: 'https://i.ytimg.com/vi/Ob02nE8_XJ4/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGEMgZShlMA8=&rs=AOn4CLD-Z51f6L5DmZ6hnmbXTEhTUH-U_A'
        },
        {
            name: 'Dư thật' ,
            singer: 'big Daddy vs bray',
            path: './access/music/Dư Thật.mp3',
            image: './access/img/dư thật.webp'
        },
        {
            name: 'Hãy trao cho anh' ,
            singer: 'Sơn Tùng MTP',
            path: './access/music/HÃY TRAO CHO ANH.mp3',
            image: './access/img/trao cho anh.jpg'
        },
        

    ],
   render: function(){
     console.log(123)
     const htmls=this.songs.map(song =>{
        return `
        <div class="song">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div> 
        `
     })
     playlist.innerHTML=htmls.join('\n') 
     
   },
//    định nghĩa thuộc  tính  object
   defineProperties: function(){
    Object.defineProperty(this,'currentSong',{
        get: function(){
            return this.songs[this.currentIndex]
        }
    })
   },
//  lắng nghe sự kiện 
   handleEvent : function(){
    const cdWidth=cd.offsetWidth
    //  xử lý khi next song
    nextBtn.onclick= function(){
        app.nextSong()
        audio.play()
        app.render()
        app.scrollToActiveSong()
    }

    //  xử lý phóng to thu nhỏ cd
    document.onscroll= function(){
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        // console.log(window.scrollY.toFixed(1))
        const newCdWidth=cdWidth-scrollTop
        cd.style.width=newCdWidth>0 ? newCdWidth+'px' :0 
        cd.style.opacity = newCdWidth/cdWidth
    }
       //  xử lí cd rotate khi quay và dừng 
       const cdThumbAnimate=cdThumb.animate([
        {
            transform:'rotate(360deg'
        }
    ],{
        duration:10000,
        iterations: Infinity
    })
    cdThumbAnimate.pause()
    // xử lý khi click play
    playBtn.onclick=function(){
        if(app.isPlaying){
            audio.pause()
        }else{
            audio.play()
            
        }
    }
    //  xử lý khi play song
    audio.onplay=function(){
        app.isPlaying=true
        player.classList.add('playing') 
        cdThumbAnimate.play()
    }
    //  xử lý khi pause song 
    audio.onpause=function(){
        app.isPlaying=false
        player.classList.remove('playing')
        cdThumbAnimate.pause()
    }
    // khi tiến độ bài hát thay đổi 
    audio.ontimeupdate= function(){
        if(audio.duration){
            const progressPercent=Math.floor(audio.currentTime/audio.duration)
            progress.value=progressPercent
            console.log(progressPercent)
        }
        
    }
    // xử lý khi tua song
    progress.onchange= function(e){
        const seekTime=audio.duration / 100 * e.target.value
        audio.currentTime=seekTime
      
    }
 

   },
   scrollToActiveSong: function(){
    setTimeout (() =>{
        $('.song.active').scrollIntoView({
            behavior:'smooth',
            block: 'nearest'
        })
    },500)
   },

   loadCurrentSong: function(){
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
    audio.src=this.currentSong.path


   },
//    xử lý khi next song
nextSong : function(){
this.currentIndex++
if(this.currentIndex >=this.songs.length){
    this.currentIndex=0
}
this.loadCurrentSong()
},

   start: function(){
    // định nghĩa các thuộc tính 
    this.defineProperties()
    //  render danh sách bài hát 
    this.render()
    // lắng nghe , xử lí các sự kiện
    this.handleEvent()
    // tải thông tin bài hát đầu tiên
    this.loadCurrentSong()
    
   }

}
app.start()