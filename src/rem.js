// 设计稿以1920px为宽度，而我把页面宽度设计为10rem的情况下,1rem就等于192px，下面我设置的16，不是192
const baseSize = 16; // 这个是设计稿中1rem的大小。
function setRem() {
  // 实际设备页面宽度和设计稿的比值
  const scale = document.documentElement.clientWidth / 750;
  // if(document.documentElement.clientWidth>1080){
     // 计算实际的rem值并赋予给html的font-size
  document.documentElement.style.fontSize = (baseSize * scale) + 'px'; 
  // }else{
  //   document.documentElement.style.fontSize = 16+'px'
  // }
  
}
setRem();
window.addEventListener('resize', () => {
  setRem();
});