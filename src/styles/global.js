import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-pagination/assets/index.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    
    * { 
        margin: 0;
        padding: 0; 
        outline: 0; 
        box-sizing: border-box; 
    }

    *:focus { 
        outline: none; 
    }

    html { 
        font-size: 62.5%;
    }

    html, body, #root { 
        height: 100%; 
    }

    body, textarea { 
        -webkit-font-smoothing: antialiased; 
        font: 1.4rem 'Roboto', sans-serif;
    }

    a { 
        text-decoration: none;
    }   

    ul { 
        list-style: none; 
    }

    button { 
        cursor: pointer;
    }

    /* Override react modal default style */
    .ReactModal__Overlay { 
        background-color: rgba(0, 0, 0, .7) !important;
    }

    .ReactModal__Content { 
        display: flex; 
        flex-direction: column; 
        justify-content: center;
        border: none !important;
        width: auto;
        height: 35rem;       
        margin: auto;

        @media (min-width: 1000px){
            width: 40rem;
        }
    }

`;
