// 教育新闻动态/切换
function XMGGTableMouseOver(tabid)
{
    if (tabid=='tabXMHZGG')   
    {
        document.getElementById('tabXMHZGG').background='images/d_64.gif';
        document.getElementById('tabXMHZGG').className='main_title3';
        document.getElementById('tabXMSPGG').background='images/d_65.gif';
        document.getElementById('tabXMSPGG').className='main_title4';
        document.getElementById('tabXMHZGGlist').style.display='';
        document.getElementById('tabXMSPGGlist').style.display='none';
         document.getElementById("aXMHZ").href="xwdt.php?t_kind=教育新闻 ";         
    
    }
    if (tabid=='tabXMSPGG')
    {
     document.getElementById('tabXMHZGG').background='images/d_65.gif';
        document.getElementById('tabXMHZGG').className='main_title4';
        document.getElementById('tabXMSPGG').background='images/d_64.gif';
        document.getElementById('tabXMSPGG').className='main_title3';     
        document.getElementById('tabXMHZGGlist').style.display='none';
        document.getElementById('tabXMSPGGlist').style.display='';
         document.getElementById("aXMHZ").href="xwdt.php?t_kind=部门新闻";            
    }
}