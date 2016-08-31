marqueesHeight=75;
 stopscroll=false;
 with(myscroll) {
  style.width=140;
  style.height=marqueesHeight;
  style.overflowX="visible";
  style.overflowY="hidden";
  noWrap=true;
  onmouseover=new Function("stopscroll=true");
  onmouseout=new Function("stopscroll=false");
 }
 preTop=0;
 currentTop=marqueesHeight;
 stoptime=0;
 myscroll.innerHTML+=myscroll.innerHTML;
 
 function init_srolltext() {
  myscroll.scrollTop=0;
  setInterval("scrollUp()",1);
 }
 init_srolltext();

 function scrollUp() {
  if(stopscroll==true) return;
   currentTop+=1;
  if(currentTop==marqueesHeight+1) { 
   stoptime+=1;
   currentTop-=1;
   if(stoptime==300)  {
    currentTop=0;
    stoptime=0;    
   }
  } else {   
   preTop=myscroll.scrollTop;
   myscroll.scrollTop+=1;
   if(preTop==myscroll.scrollTop) {
    myscroll.scrollTop=marqueesHeight;
    myscroll.scrollTop+=1;   
   }
  }    
 }
 init_srolltext();  