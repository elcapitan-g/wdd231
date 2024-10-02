
document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedElement = document.getElementById('lastModified');
    
   
    const lastModifiedDate = new Date(document.lastModified);
    
   
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short' 
    };
    
    
    lastModifiedElement.textContent = `Last Modified: ${lastModifiedDate.toLocaleString('en-US', options)}`;
});
