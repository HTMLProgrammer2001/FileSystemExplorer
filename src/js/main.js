//Import pages, styles, files
import 'pages/index.html';
import 'bootstrap';
import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'scss/style.scss';

//import my components
import Explorer from './Components/Explorer';

//init App
let expPath = new URL(location.href).searchParams.get('path');
ReactDOM.render(<Explorer path = {expPath || '/'}/>, document.querySelector('#main'));