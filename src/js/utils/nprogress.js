NProgress.set(0.4); // To set a progress percentage, call .set(n), where n is a number between 0..1
NProgress.inc(); // To increment the progress bar, just use .inc(). This increments it with a random amount. This will never get to 100%: use it for every image load (or similar).If you want to increment by a specific value, you can pass that as a parameter

NProgress.configure({
    showSpinner: false, //Turn off loading spinner by setting it to false. (default: true)
    trickleSpeed: 800, //Adjust how often to trickle/increment, in ms.
    ease: 'ease', // Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: ease and 200)
    speed: 600,
    parent: '#navbar' //specify this to change the parent container. (default: body)
});

NProgress.start();

// window.onload = () => {
//     NProgress.done();
// };
