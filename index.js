

const toggleButton = document.getElementById('toggle-mode');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

    const btnHamburguesa = document.getElementById('btn-h');
    const aside = document.querySelector('.light-mode'); 

    btnHamburguesa.addEventListener('click', () => {
        aside.classList.toggle('active-menu');
    });







   
  






