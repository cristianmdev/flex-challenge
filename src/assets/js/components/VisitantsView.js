

/**
 * @desc React
 */
import React            from 'react';

/**
 * @name FormView
 * @desc view of form
 */
class VisitantsView extends React.Component{

  /**
   * @name constructor
   * @desc props by default
 */
  constructor(props){

    /* @ */
    super(props);
    
    /* @ */
    this.onRemove      = props.onRemove.bind(this);
    this.onSelect      = props.onSelect.bind(this);
  }

  onRemoveVisit(key){

    /* @ */
    let visitants = this.props.visitants;
    
    /* @ */
    delete visitants[key];

    /* @ */
    this.props.onRemove(visitants);

  }

  onSelectVisit(key){

    /* @ */
    let visitants = this.props.visitants;

    /* @ */
    this.props.onSelect(visitants[key]);

  }

  /**
  * @name insertVisitants
  * @desc Structure of a visitant
  * @return <LI>
  */
  insertVisitants(person,key){
    return (<li key={key} >
            <h1 onClick={() => this.onSelectVisit(key)}>
            {person.name} - {person.country} - {person.date}
            </h1>
            <button onClick={() => this.onRemoveVisit(key)}>X</button>
          </li>);
  }


  render(){

    return (
      <section>
        <h1>Visitantes Anteriores</h1>
        <ul>
          {
            (
              this.props.visitants.length > 0 
                  ? this.props.visitants.map(this.insertVisitants.bind(this))
                  : ''
            )
          }
        </ul>
      </section>
    );


  }

}

export default VisitantsView;