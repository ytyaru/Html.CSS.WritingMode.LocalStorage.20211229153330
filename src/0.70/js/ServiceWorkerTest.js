export default class ServiceWorkerTest {
    constructor() {
        this.msg="Hello ServiceWorker!!";
        this.#setup();
    }
    show() {
        console.log(this.msg);
        alert(this.msg);
    }
    #setup() {
        console.log('has navigator:',navigator);
        console.log(`has serviceWorker: ${'serviceWorker' in navigator}`);
        navigator.serviceWorker.register('sw.js', {
            scope: './'
        }).then(function(registration) {
            var serviceWorker;
            if (registration.installing) {
                console.log('installing');
                serviceWorker = registration.installing;
                document.querySelector('#kind').textContent = 'installing';
            } else if (registration.waiting) {
                console.log('waiting');
                serviceWorker = registration.waiting;
                document.querySelector('#kind').textContent = 'waiting';
            } else if (registration.active) {
                console.log('active');
                serviceWorker = registration.active;
                document.querySelector('#kind').textContent = 'active';
            }
            if (serviceWorker) {
                console.log(`state: ${serviceWorker.state}`);
                serviceWorker.addEventListener('statechange', function (e) {
                    console.log(`state: ${e.target.state}`);
                });
            }
        }).catch (function (error) {
            console.log(error);
        });
    }
    download() {

    }

    install() {

    }

    activate() {

    }


    /*
    constructor(serviceWorker) {
        this.msg="Hello ServiceWorker!!";
        this.#setup();
        this.serviceWorker = serviceWorker;
    }
    show() {
        console.log(this.msg);
        alert(this.msg);
    }
    #setup() {
        console.log(`has serviceWorker: ${'serviceWorker' in window.navigator}`);
        console.log(`has serviceWorker: ${'serviceWorker' in navigator}`);
//        navigator.serviceWorker.register('ServiceWorkerTest.js', {
        this.serviceWorker.register('ServiceWorkerTest.js', {
            scope: './'
        }).then(function(registration) {
            var serviceWorker;
            if (registration.installing) {
                serviceWorker = registration.installing;
                document.querySelector('#kind').textContent = 'installing';
                console.log('installing');
            } else if (registration.waiting) {
                serviceWorker = registration.waiting;
                document.querySelector('#kind').textContent = 'waiting';
                console.log('waiting');
            } else if (registration.active) {
                serviceWorker = registration.active;
                document.querySelector('#kind').textContent = 'active';
                console.log('active');
            }
            if (serviceWorker) {
                console.log(`state: ${serviceWorker.state}`);
                // logState(serviceWorker.state);
                serviceWorker.addEventListener('statechange', function (e) {
                    console.log(`state: ${e.target.state}`);
                    // logState(e.target.state);
                });
            }
        }).catch (function (error) {
            // Something went wrong during registration. The service-worker.js file
            // might be unavailable or contain a syntax error.
            console.log(error);
        });
    }
    download() {

    }

    install() {

    }

    activate() {

    }
    */
}
