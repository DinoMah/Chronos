import './style.css'
import { createIcons, Eye, HardDriveDownload, Search, Loader } from 'lucide';
import { render } from 'inferno';
import { Router, Route } from 'inferno-router';
import { createBrowserHistory } from 'history';
import InfernoCompat from 'inferno-compat';
import ScheduleView from './ScheduleComponents/ScheduleView.jsx';
import LoginForm from './LoginComponents/LoginForm.jsx';
import ProjectView from './Views/Project/ProjectView.jsx';

console.log(import.meta.env.BASE_URL)
console.log(import.meta.env);

const appDiv = document.getElementById("app");
const history = createBrowserHistory();

//render(<LoginForm/>, appDiv);

//render(<Cronogram/>, appDiv);

//render(<ScheduleView/>, appDiv);

//render(<ProjectView/>, appDiv);

// Antes de render
Object.defineProperty(InfernoCompat, 'options', {
  value: { reactStyles: false, suppressHydrationWarning: true },
  writable: true
});

render(
  <Router history={history}>
    <Route exact path='/' component={LoginForm}/>
    <Route exact path='/schedule' component={ScheduleView}/>
    <Route exact path='/project/:id' component={ProjectView}/>
  </Router>,
  appDiv
);

createIcons({
  attrs: {
    'stroke-width': 1,
    stroke: "#000000"
  },
  icons: {
    Search,
    Eye,
    HardDriveDownload,
    Loader
  }
});