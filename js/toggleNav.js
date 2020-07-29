(function(){
    const bars = document.querySelectorAll('.bars');
    const navbar = document.querySelector('.page-nav__navbar');
    
    bars.forEach(bar=>{
        bar.addEventListener('click',(e)=>{
            e.target.classList.toggle('bars--active');
            navbar.classList.toggle('page-nav__navbar--active');
        })  
    })
    
}());