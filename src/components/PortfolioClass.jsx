import React from 'react';

export class PortfolioClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects,
      filters: ["All", "Websites", "Flayers", "Business Cards"],
      selected: "All",
      filteredProjects: props.projects,
    };
    
    this.filtration = this.filtration.bind(this);
    this.toolbar = this.toolbar.bind(this);
    this.projectList = this.projectList.bind(this);
    this.render = this.render.bind(this);
  }

  filtration(selected) {
    const { projects } = this.state;
    const filteredProjects = selected === "All" ? projects : projects.filter(
      project => project.category === selected
    );
    
    this.setState({ filteredProjects });
  }

  projectList(filteredProjects) {
    console.log('Отфильтровано:', filteredProjects)
    return(
      filteredProjects.map(project => (
        <div className="project-card">
          <img className="img" src={project.img} crossorigin="anonymous />
          <div className="category">{project.category}</div>
        </div>
      ))
    );
  }

  toolbar() {
    const selectFilter = (e) => {
      let tag = e.target.textContent;
      this.setState({ selected: tag });
      this.filtration(tag)
    };

    const { filters, selected } = this.state;

    return filters.map(filter => (
      filter === selected
        ? <button onClick={selectFilter} className="toolbar-button selected-button">{filter}</button>
        : <button onClick={selectFilter} className="toolbar-button">{filter}</button>
    ));
  }


  render() {
    return (
      <div className="portfolio-window">
        <div className="toolbar-container">
          {this.toolbar()}
        </div>
        <div className="project-container">
          {this.projectList(this.state.filteredProjects)}
        </div>
      </div>
    )
  }

}
