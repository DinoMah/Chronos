import { Component } from "inferno";
import { withRouter } from 'inferno-router';
import { HardDriveDownload, Loader } from "lucide-react";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import Cronogram from "../../Generic/GanttComponent";

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: null,
      projectName: "",
      projectInitDate: "",
      projectDispInitDate: "",
      projectEndDate: "",
      projectDispEndDate: "",
      tasks: null,
      areas: [],
      users: [],
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
        projectInitDate: data.period.initDate,
        projectEndDate: data.period.endDate,
        projectDispInitDate: projectStartDate,
        projectDispEndDate: projectEndDate,
        tasks: data.tasks,
        projectPeriod: data.period,
        taskPeriods: data.taskPeriods
      });
     })
    .catch(error => alert(error));

    fetch('http://localhost:5084/area/all')
    .then(result => {
      if (!result.ok)
        throw new Error("Error: " + result.status);

      return result.json();
    })
    .then(data => {
      let areasData = [];
      data.forEach(e => { areasData.push({id: e.id, name: e.name }); });
      this.setState({areas: areasData});
    })
    .catch(error => alert(error));


    fetch('http://localhost:5084/user/all')
    .then(result => {
      if (!result.ok)
        throw new Error("Error: " + result.status);

      return result.json();
    })
    .then(data => {
      let usersData = [];
      data.forEach(e => { usersData.push({id: e.id, name: e.fullName, area: e.area}); });
      this.setState({users: usersData});
    })
    .catch(error => alert(error));
  }

  onExport = async (event) => {
    this.setState({downloading: !this.state.downloading});

    setTimeout(() => {this.setState({downloading: !this.state.downloading})}, 1000);
   
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Cronograma', {
      views: [{state: 'frozen', ySplit: 4, xSplit: 4}],
      pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true }
    });
    const tasks = this.state.tasks;
    const taskPeriods = this.state.taskPeriods;
    const startDate = new Date(this.state.projectInitDate);
    const endDate = new Date(this.state.projectEndDate);

    const days = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    sheet.addRow([]);
    sheet.addRow([]);

    const month_row = sheet.addRow(['ITEM', 'ÁREA', 'RESPONSABLE', 'TAREA']);
    const day_row = sheet.addRow(['', '', '', '']);

    days.forEach(day => {
      month_row.getCell(month_row.cellCount + 1).value = day.toLocaleString('default', { month: 'short', year: 'numeric' }).toUpperCase();
      month_row.getCell(month_row.cellCount).alignment = { horizontal: 'center' };
      month_row.getCell(month_row.cellCount).font = { bold: true };

      day_row.getCell(day_row.cellCount + 1).value = day.getDate();
      day_row.getCell(day_row.cellCount).alignment = { horizontal: 'center' };
    });

    let current_month = '';
    let startCol = 5;
    days.forEach((day, i) => {
      const monthKey = day.toLocaleString('default', { month: 'short', year: 'numeric' });
      if (monthKey !== current_month) {
        if (startCol < i + 4) {
          sheet.mergeCells(3, startCol, 3, i + 4);
          sheet.getCell(3, startCol).alignment = { horizontal: 'center', vertical: 'middle' };
        }
        startCol = i + 5;
        current_month = monthKey;
      }
    });
    sheet.mergeCells(3, startCol, 3, days.length + 4);

    // Llena las filas con la información de las tareas
    tasks.forEach(task => {
      let area = this.state.areas.find(a => a.id === task.area);
      let user = this.state.users.find(u => u.id === task.responsible);

      const row = sheet.addRow([
        task.taskNumber,
        area.name,
        user.name,
        task.description,
        ...days.map(day => {
          const taskPeriod = taskPeriods.find(p => p.id === task.programmedPeriod);

          if (!taskPeriod) return '';

          const taskStart = new Date(taskPeriod.initDate);
          const taskEnd = new Date(taskPeriod.endDate);
          const dayDate = new Date(day);

          if (dayDate >= taskStart && dayDate <= taskEnd)
          {
            return '█';
          }

          return '';
        })
      ]);

      row.getCell(2).font = { bold: true };
      row.getCell(3).font = { bold: true };
      row.getCell(4).font = { bold: true };
    });

    // Ajusta el tamaño de las columnas con los días
    sheet.columns.forEach((col, i) => {
      if (i >= 4) col.width = 3;
    });

    // Ajusta el tamaño de las primeras columnas (area, responsable, tarea)
    sheet.getColumn(2).width = 25;
    sheet.getColumn(3).width = 25;
    sheet.getColumn(4).width = 40;

    const sheetCols = sheet.columns;
    let currDay = 0;
    
    for (let i = 4; i < sheetCols.length; i++)
    {
      const cells = [];
      
      sheetCols[i].eachCell({ includeEmpty: true }, (cell, rowNum) => {
        if (rowNum < 4) return;
          cells.push(cell);
      });

      if (days[currDay].getDay() % 6 === 0)
      {
        cells.forEach(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '76933c' }
          };
        });
      }
      
      currDay++;
    }

    [1, 2, 3, 4].forEach(r => {
      sheet.getRow(r).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D3D3D3' }
      };
      sheet.getRow(r).font = { bold: true };
    });

    // Une las celdas de los días de cada tarea para hacer un gráfico de barra
    sheet.eachRow((row, rowNum) => {
      if (rowNum <= 4) return;

      let start = null;
      let end = null;

      row.eachCell({ includeEmpty: true }, (cell, colNum) => {
        if (colNum <= 4) return;

        const cellIsEmpty = (cell.value === null || cell.value === '');

        if (!cellIsEmpty && start === null) {
          start = cell.address;
          end = cell.address;
        }
        else if (!cellIsEmpty && start !== null) {
          end = cell.address;
        }
      });

      if (start && end && start !== end) {
        sheet.mergeCells(`${start}:${end}`);
      }

      start = start.replace(/\d+/g, '');

      const cell = row.getCell(start);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0070c0' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.value = '';

      start = null;
      end = null;

    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'cronograma.xlsx');
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
            <input type="text" value={this.state.projectDispInitDate} readOnly="true"/>
          </label>

          <label className="input">
            <span className="label">Fecha de fin</span>
            <input type="text" value={this.state.projectDispEndDate} readOnly="true"/>
          </label>

          <button className="btn btn-info ml-5" onClick={this.onExport}>
            Guardar
            { this.state.downloading ? <Loader/> : <HardDriveDownload/> }
            
          </button>
        </div>

        <div className="flex flex-row w-full h-9/10">
          <Cronogram tasks={this.state.tasks} taskPeriods={this.state.taskPeriods}/>
        </div>
      </div>
    );
  }
}

export default ProjectView;