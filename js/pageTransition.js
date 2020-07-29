const pageTransition = () =>{
    if(window.innerWidth < 900) {

        const tl = gsap.timeline();

        tl.set('.page-transition__container--xs',{visibility:'visible'})
        .to('.from-left',0.9,{
            transformOrigin:'left',
            scaleX:1,
            left:'0%',
        })
        .to(".from-left",0.9,{
            transformOrigin:"right",
            scaleX:0,
            left:'100%'
        })
        .set(".page-transition__container--xs",{visibility:'hidden'})
    }else{

        const tl = gsap.timeline();
        tl.set('.page-transition__container--md',{visibility:'visible'})
        .to('.from-top',1.3,{
            transformOrigin:'top',
            top:'0%',
            scaleY:1,
            stagger:0
        })
        .to('.from-bottom',1.3,{
            transformOrigin:'bottom',
            bottom:"0%",
            scaleY:1,
            stagger:0,
        }, '-=1.3')
        .to('.from-top',1.3,{
            transformOrigin:'bottom',
            top:"100%",
            scaleY:0,
            stagger:0
        })
        .to('.from-bottom',1.3,{
            transformOrigin:'top',
            bottom:'100%',
            scaleY:0,
            stagger:0
        },'-=1.3')
        .set('.page-transition__container--md',{visibility:'hidden'});
    }

}

function delay(n){
    n = n || 2000;
    return new Promise(done=>{
        setTimeout(()=>{
            done()
        },n)
    })

}

function fadeOut(){
    const tl = gsap.timeline();

    tl.to('.page',0.5,{opacity:0})
}
function fadeIn(){

    const tl = gsap.timeline();
    
    tl.set('.page-transition__element',{opacity:0,y:'25%'})
    .set('.page',{opacity:0})
    .to('.page',1.4,{opacity:1})
    .to('.page-transition__element',1.3,{opacity:1, y:"0%" ,delay:0.4,scale:1, stagger:0.2},'-=1')
}

const createScript = (next, path) =>{
    let script = document.createElement('script');
    script.src = path;
    next.container.appendChild(script);

}

barba.init({
    sync:true,

    transitions:[{

           async beforeEnter({next}){
                createScript(next, './js/toggleNav.js');

                if(next.namespace === 'home' || next.namespace === 'event'){
                    createScript(next, "./js/three.min.js");
                    createScript(next, "./js/imagesloaded.pkgd.min.js");
                    createScript(next, './js/hover.js');
                    createScript(next, './hoverEffect.js');
                }

                if(next.namespace === 'contact'){
                    document.querySelector('.contact__contact-data__form').addEventListener('submit',e=>{e.preventDefault()});
                }
            
            },

            async leave(data){
                const done = this.async();
        
                pageTransition()
                fadeOut()
                await delay(1900)
                done()
            },
        
            async enter(data){
                fadeIn()
            },
            async once(data){
                fadeIn()
            }
        
    }]

});