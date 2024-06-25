let menuVisible = false;

// Función que muestra y oculta el menú
function mostrarOcultarMenu() {
    if(menuVisible) {
        document.getElementById('nav').classList ='';
        menuVisible = false
    }
    else {
        document.getElementById('nav').classList ='responsive';
        menuVisible = true;
    }
}

// Función que oculta el menú cuando seleccionamos una opción
function seleccionar() {
    document.getElementById('nav').classList ='';
    menuVisible = false;
}


// Función para que cuando lleguemos al apartado de SKILLS las barritas se disparen con la animación
function efectoHabilidades() {
    var skills = document.getElementById('skills');
    var distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distanciaSkills >=300) {
        let habilidades = document.getElementsByClassName('progreso');
        habilidades[0].classList.add('html');
        habilidades[1].classList.add('css');
        habilidades[2].classList.add('javascript');
        habilidades[3].classList.add('bootstrap');
        habilidades[4].classList.add('resolutiva');
        habilidades[5].classList.add('equipo');
        habilidades[6].classList.add('compromiso');
        habilidades[7].classList.add('proactividad');
    }
}

/*window.onscroll = function() {
    efectoHabilidades();
}*/ 

window.onscroll = efectoHabilidades;