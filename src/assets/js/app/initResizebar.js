function ResizebarInit (){
    let sid = document.querySelector('app-sidebar');
    let content = document.querySelector('.content');
    let r = document.querySelector('.resizebar');

    let curr_width = sid.offsetWidth;
    let unlock = false;

    document.addEventListener('mousemove', (e) => {
        let change = curr_width + (e.clientX - curr_width);

        if (unlock) {
            if (change > 99) {

                sid.style.width = change+'px';

                console.log(sid.style.width);
            }
            else if (change <= 10) {

                sid.style.width = 0+'px';

                console.log(sid.style.width);
            }
            else {
                sid.style.width = '100px';

                console.log("else "+change);
            }
        }
    });

    r.addEventListener('mousedown', (e) => {
        if(!sid.classList.contains('isOpen')){
            curr_width = sid.offsetWidth;
            unlock = true;
        }
    });
    document.addEventListener('mouseup', (e) => {
        curr_width = sid.offsetWidth;
        unlock = false;
    });

    document.addEventListener('mousedown', (e) => {
        if (unlock) {
            e.preventDefault();
        }

    });
    document.addEventListener('resize', (e)=>{
        if(window.innerWidth<768)
        {
            sid.style.width = '0';
        }
    })


}
