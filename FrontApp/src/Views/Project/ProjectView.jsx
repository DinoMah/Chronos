import { Component } from "inferno";
import { withRouter } from 'inferno-router';
import { HardDriveDownload, Loader } from "lucide-react";
import jsPDF from "jspdf";
import "svg2pdf.js";

import Cronogram from "../../Generic/GanttComponent";
import svg from "daisyui/base/svg";

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      projectName: "",
      projectInitDate: "",
      projectEndDate: "",
      tasks: null,
      projectPeriod: null,
      taskPeriods: null,
      downloading: false
    };

    this.downloadIconRef = null;
  }

  componentDidMount() {
    const { match } = this.props;
    const projectId = match.params.id;
    const instance = this;

    fetch(`http://localhost:5084/project/${projectId}`)
    .then(result => {
      if (!result.ok)
        throw new Error("Error: " + result.status);
            
      return result.json();
    })
    .then(data => { 
      const projectStartDate = new Date(data.period.initDate).toLocaleDateString();
      const projectEndDate = new Date(data.period.endDate).toLocaleDateString();

      instance.setState({
        project: data.project,
        projectName: data.project.name,
        projectInitDate: projectStartDate,
        projectEndDate: projectEndDate,
        tasks: data.tasks,
        projectPeriod: data.period,
        taskPeriods: data.taskPeriods
      });
     })
    .catch(error => alert(error));
  }

  onExport = async (event) => {
    this.setState({downloading: !this.state.downloading});

    setTimeout(() => {this.setState({downloading: !this.state.downloading})}, 1000);
    
    const ganttSvg = document.getElementById('gantt');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    await pdf.svg(svg, {x: 10, y: 10, width: 277, height: 190});
    pdf.save('gantt-diagram-hor.pdf');
    /*
    

    let scale = pdfWidth / (imgWidth / canvas.width * imgWidth);
    if (imgHeight * scale / imgWidth > pdfHeight) {
      scale = pdfHeight / (imgHeight / canvas.height * imgHeight);
    }

    const width = imgWidth * scale / canvas.width;
    const height = imgHeight * scale / canvas.height;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('gantt-diagrama-horizontal.pdf');*/
  }

  render() {
    return (
      <div className="h-full">
        <div className="flex flex-row justify-center w-full h-1/10 items-center">

          <label className="input mr-5">
            <span className="label">Proyecto</span>
            <input type="text" value={this.state.projectName} readOnly="true"/>
          </label>

          <label className="input mr-5">
            <span className="label">Fecha de inicio</span>
            <input type="text" value={this.state.projectInitDate} readOnly="true"/>
          </label>

          <label className="input">
            <span className="label">Fecha de fin</span>
            <input type="text" value={this.state.projectEndDate} readOnly="true"/>
          </label>
        </div>
        
        <div className="flex flex-row w-full h-1/10 items-center">
          <button className="btn btn-info ml-5" onClick={this.onExport}>
            Guardar
            { this.state.downloading ? <Loader/> : <HardDriveDownload/> }
            
          </button>
        </div>

        <div className="flex flex-row w-full h-8/10">
          <Cronogram tasks={this.state.tasks} taskPeriods={this.state.taskPeriods}/>
        </div>
      </div>
    );
  }
}

export default ProjectView;