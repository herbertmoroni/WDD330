async function fetchAlerts() {
    const response = await fetch('alerts.json');
    const alerts = await response.json();

    if (alerts.length === 0) return; // in case it doesn't find anything

    const alertSection = document.createElement('section');
    alertSection.className = 'alert-list'; // creates alert-list if it finds anything

    alerts.forEach(alert => {
        const alertParagraph = document.createElement('p'); // builds a paragraph for each alert
        alertParagraph.textContent = alert.message;
        alertParagraph.style.backgroundColor = alert.background; // apply background color
        alertParagraph.style.color = alert.color; // apply foreground color
        alertSection.appendChild(alertParagraph);
    });

    const mainElement = document.querySelector('main');
    mainElement.prepend(alertSection);
}

export default fetchAlerts;

// document.addEventListener('DOMContentLoaded', () => {
//     fetchAlerts();
// }); // removed because alert would show twice