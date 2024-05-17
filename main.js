const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const heading=$('header h2')
const cdThumb=$('.cd-thumb')
const audio=$('#audio')
const cd=$('.cd')
const playBtn= $('.btn-toggle-play')
const player=$('.player')
const progress=$('#progress')
const nextBtn=$('.btn-next')
const prevBtn=$('.btn-prev')
const repeatBtn=$('.btn-repeat')
const playlist=$('.playlist')

const app={
    isRepeat:false,
    currentIndex:0,
    isPlaying:false,
    songs:[
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
            name: 'chúng ta của tương lai vs nâng chén tiêu sầu  ' ,
            singer: 'MTP vs BP',
            path: './access/music/Chúng Ta Của Tương Lai ft Nâng Chén Tiêu Sầu.mp3',
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
            name: 'DADADA' ,
            singer: 'HGFDE',
            path: './access/music/Dadada  Thereon.mp3',
            image: './access/img/dada.webp'
        },
        {
            name: 'Hãy trao cho anh' ,
            singer: 'Sơn Tùng MTP',
            path: './access/music/HÃY TRAO CHO ANH.mp3',
            image: './access/img/trao cho anh.jpg'
        },
        {
            name: 'Greedy' ,
            singer: 'Obvious',
            path: './access/music/Greedy.mp3',
            image: './access/img/greedy.jpg'
        },
        {
            name: 'one more night' ,
            singer: 'Maroon 5',
            path: './access/music/One More Night.mp3',
            image: 'https://i.ytimg.com/vi/Ob02nE8_XJ4/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGEMgZShlMA8=&rs=AOn4CLD-Z51f6L5DmZ6hnmbXTEhTUH-U_A'
        },
        {
            name: 'Gods' ,
            singer: 'Thereon Remix  ',
            path: './access/music/Gods  Thereon Remix.mp3',
            image: './access/img/img-2.webp'
        },
        {
            name: 'cheri cheri lady' ,
            singer: 'malena',
            path: './access/music/Cheri Cheri Lady.mp3',
            image: './access/img/img-4.webp'
        },
        {
            name: 'Khuôn mặt đáng thương' ,
            singer: 'Sơn Tùng MTP',
            path: './access/music/Khuôn Mặt Đáng Thương.mp3',
            image: './access/img/hqdefault.webp'
        },
        {
            name: 'making my way' ,
            singer: 'Son Tung MTP',
            path: './access/music/MAKING MY WAY.mp3',
            image: './access/img/make my way.jpg'
        },
       
    ],


    render: function(){
        console.log(234)
        const htmls=this.songs.map((song, index) =>{
            return `
            <div class="song ${index===this.currentIndex ? 'active' : ''}" data-index="${index}">
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
        playlist.innerHTML =htmls.join('')
    },
       defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
       },
    handleEvent: function(){  
        const  cdWidth=cd.offsetWidth


        //  khi next  song
        nextBtn.onclick =  function(){
             app.nextSong()
             audio.play()
             app.render()
             app.scrollToActiveSong()
        }
        //  khi  prev song
        prevBtn.onclick= function(){
           app.prevSong()
           audio.play()
           app.render()
           app.scrollToActiveSong()
       }

        //  xử lí quay và dừng 
        const cdThumbAnimate=cdThumb.animate([
            {
                transform:'rotate(360deg'
            }
        ],{
            duration:10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // xử lí phóng to thu nhỏ cd 
        document.onscroll= function() {
           const scrollTop =  window.scrollY
           const newWidth= cdWidth-scrollTop
           console.log(scrollTop)

           cd.style.width=newWidth>0 ? newWidth +'px' :0
           cd.style.opacity=newWidth / cdWidth
          
           
         }

        //   xử lí khi click play
        playBtn.onclick=function(){
            if(app.isPlaying){
                // app.isPlaying=true
                audio.pause()
                // player.classList.remove('playing')
            }else{
                // app.isPlaying=true
                audio.play()
                // player.classList.add('playing')

            }
        }

        //  xử lí khi play song
        audio.onplay=function(){
            app.isPlaying=true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // xử lí khi pause song
        audio.onpause=function(){
            app.isPlaying=false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //  sau khi tiến độ bài hát thay đổi 
        audio.ontimeupdate= function(){
            if(audio.duration){
                const progressPercent=Math.floor(audio.currentTime/audio.duration *100)
                progress.value=progressPercent
                console.log(progressPercent)
            }
        }
        
        // xử lí khi tua song
        progress.onchange=function(e){
          const seekTime=audio.duration / 100 * e.target.value
          audio.currentTime=seekTime
        }
          //  xử lí repeat khi ended
          repeatBtn.onclick=function(e){
            app.isRepeat=!app.isRepeat
            repeatBtn.classList.toggle('active',app.isRepeat)
          }

        //  xử lí next song khi audio ended
        audio.onended= function(){
            if(app.isRepeat){
                 audio.play()
                }else{
                // app.render()
                app.scrollToActiveSong()
                app.nextSong()
                audio.play()
               console.log(app.render())
            }
            
        }
        //  click vào playlist
        playlist.onclick = function(e){
            const songNote=e.target.closest('.song:not(.active)') 

            if(songNote || e.target.closest('.option')){
                //  xử lí khi click vào song
                if(songNote){
                    // app.currentIndex=songNote.getattribute('data-index')    cách 1
                   app.currentIndex=Number(songNote.dataset.index)                // cách 2
                    app.loadCurrentSong()
                    audio.play()
                    app.render()
                  
                }
                //  xử lí hi click vào song option
                if(e.target.closest('.option')){

                }

               

            }

        }
         
      
       
    },

    scrollToActiveSong: function(){

        setTimeout(() =>{

            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block: 'nearest'
            })
        },500)
    },
    loadCurrentSong: function(){
      
        heading.textContent=this.currentSong.name
        cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
        audio.src=this.currentSong.path
        // console.log(heading, cdThumb, audio)
    },

     //  xử lí khi next bài hát
     nextSong: function (){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex=0
        }
            this.loadCurrentSong()
           
        
    },

     prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex=this.songs.length-1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function(){
        let newIndex 
        do{
            newIndex=Math.floor(Math.random()* this.songs.length)
        }
        while (newIndex===this.currentSong );
            console.log(newIndex)
        this.currentIndex=newIndex
        this.loadCurrentSong()

    },

   


    start: function(){
        // Định nghĩa các thuộc tính cho  object
        this.defineProperties()
        // render lại playlisst
        this.render()
        // lắng nghe , xử lí các sự kiện 
        this.handleEvent()

        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()
    }
}
app.start()