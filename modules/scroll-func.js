
export const scrollFunc = (location, time)=>{
    $('html, body').animate({ scrollTop: $(location).offset().top }, time);
}
