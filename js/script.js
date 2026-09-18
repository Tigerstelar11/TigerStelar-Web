const menuButton=document.querySelector('.menu-button');const nav=document.querySelector('nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}))}document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

const lightbox=document.querySelector('.lightbox');if(lightbox){const lightboxImage=lightbox.querySelector('img');const lightboxText=lightbox.querySelector('p');document.querySelectorAll('.gallery-button').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img');lightboxImage.src=image.src;lightboxImage.alt=image.alt;lightboxText.textContent=button.closest('figure').querySelector('figcaption').textContent;lightbox.showModal()}));lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()})}

const musicPlayer=document.querySelector('[data-music-player]');
if(musicPlayer){
  const audioBase=musicPlayer.dataset.audioBase||'';
  const tracks=[
    {title:'irony -TV Mix-',file:'01-irony-tv-mix.ogg'},
    {title:'Ore no Imouto ga Ikaryaku',file:'03-ore-no-imouto-ga-ikaryaku.ogg'},
    {title:'Baka Aniki!',file:'04-baka-aniki.ogg'},
    {title:'Aniki no Nichijou',file:'05-aniki-no-nichijou.ogg'},
    {title:'agete ikou!',file:'06-agete-ikou.ogg'},
    {title:'Shinsou no Reijou',file:'07-shinsou-no-reijou.ogg'},
    {title:'Kore ga Otaku no Ikirumichi',file:'08-kore-ga-otaku-no-ikirumichi.ogg'},
    {title:'Kuroneko wa Tango',file:'09-kuroneko-wa-tango.ogg'},
    {title:'-(^o^)-',file:'10-emoticon.ogg'}
  ];
  const audio=musicPlayer.querySelector('audio');
  const title=musicPlayer.querySelector('.player-track');
  const counter=musicPlayer.querySelector('.player-counter');
  const playButton=musicPlayer.querySelector('.player-play');
  const previousButton=musicPlayer.querySelector('.player-prev');
  const nextButton=musicPlayer.querySelector('.player-next');
  const volume=musicPlayer.querySelector('.player-volume input');
  const toggle=musicPlayer.querySelector('.player-toggle');
  let current=0;

  function loadTrack(index,autoplay=false){
    current=(index+tracks.length)%tracks.length;
    audio.src=audioBase+tracks[current].file;
    title.textContent=tracks[current].title;
    counter.textContent=`${current+1} / ${tracks.length}`;
    if(autoplay)audio.play().catch(()=>{});
  }
  function updatePlayButton(){
    const playing=!audio.paused;
    playButton.textContent=playing?'❚❚':'▶';
    playButton.setAttribute('aria-label',playing?'Pausar':'Reproducir');
  }
  function changeTrack(direction){loadTrack(current+direction,true)}

  playButton.addEventListener('click',()=>audio.paused?audio.play():audio.pause());
  previousButton.addEventListener('click',()=>changeTrack(-1));
  nextButton.addEventListener('click',()=>changeTrack(1));
  audio.addEventListener('play',updatePlayButton);
  audio.addEventListener('pause',updatePlayButton);
  audio.addEventListener('ended',()=>changeTrack(1));
  audio.addEventListener('error',()=>{title.textContent='No se pudo cargar la pista';updatePlayButton()});
  volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;localStorage.setItem('oreimo-volume',volume.value)});
  toggle.addEventListener('click',()=>{
    const minimized=musicPlayer.classList.toggle('minimized');
    toggle.setAttribute('aria-expanded',String(!minimized));
    toggle.setAttribute('aria-label',minimized?'Expandir reproductor':'Minimizar reproductor');
    localStorage.setItem('oreimo-player-minimized',String(minimized));
  });
  const savedVolume=localStorage.getItem('oreimo-volume');
  if(savedVolume!==null)volume.value=savedVolume;
  audio.volume=Number(volume.value)/100;
  const savedMinimized=localStorage.getItem('oreimo-player-minimized');
  if(savedMinimized==='true'||(savedMinimized===null&&window.matchMedia('(max-width: 900px)').matches)){
    musicPlayer.classList.add('minimized');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Expandir reproductor');
  }
  loadTrack(0);
}
