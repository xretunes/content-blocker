document.addEventListener('DOMContentLoaded', () => {

    function setCookie( name, value, days ) {
        let expires = '';
        if ( days ) {
            let date = new Date();
            date.setTime( date.getTime() + days * 24 * 60 * 60 * 1000 );
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + ( value || '' ) + expires + '; path=/';
    }

    function getCookie( name ) {
        let nameEQ = name + '=';
        let ca = document.cookie.split( ';' );
        for ( let i = 0; i < ca.length; i++ ) {
            let c = ca[i];
            while ( c.charAt(0) == ' ' ) c = c.substring( 1, c.length );
            if ( c.indexOf(nameEQ) == 0 )
                return c.substring( nameEQ.length, c.length );
        }
        return null;
    }

    function activateContent() {
        const iframes = document.querySelectorAll( '.consent-container [data-src]' );

		iframes.forEach( ( iframe ) => {
			iframe.src = iframe.dataset.src;
            iframe.style.display = 'unset';
		});

        document.querySelectorAll( '.consent-notice' ).forEach( element => {
            element.style.display = 'none';
        });
    }

    function attachEvents() {
        const notices = document.querySelectorAll( '.consent-notice' );

        notices.forEach((notice) => {
            notice.addEventListener( 'submit', ( event ) => {

                activateContent();
                setCookie( 'consent_content', 'true', 365 );

                event.preventDefault();
            });
        });
    }

    if ( getCookie( 'consent_content' ) === 'true' ? activateContent() : attachEvents() );

});