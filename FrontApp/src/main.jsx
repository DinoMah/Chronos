import './style.css'
import { createIcons, Search } from 'lucide';
import { render } from 'inferno';
import ScheduleView from './ScheduleComponents/ScheduleView.jsx';
import LoginForm from './LoginComponents/LoginForm.jsx';
import Cronogram from './Generic/GanttComponent.jsx';

createIcons({
  attrs: {
    'stroke-width': 1,
    stroke: "#000000"
  },
  icons: {
    Search
  }
});

console.log(import.meta.env.BASE_URL)

const appDiv = document.getElementById("app");

//render(<LoginForm/>, appDiv);

//render(<Cronogram/>, appDiv);

render(<ScheduleView/>, appDiv);