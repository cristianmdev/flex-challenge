/**
 * @desc React
 */
import React            from 'react';

/* @ */
import Store            from '../../../store';

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
    this.handleRemoveVisit      = this.handleRemoveVisit.bind(this);
    this.handleSelectVisit      = this.handleSelectVisit.bind(this);
    this.eachVisitants      = this.eachVisitants.bind(this);
  
    /* @ */
    this.state = {
      visitants: [],
      user     : {
        "name" : 'Desconocido',
        "date" : Store.getState().today
      },
    };

    /* @ Changes in Store */
    Store.subscribe(() => {
      this.setState({
        visitants: Store.getState().visitants,
        user     : Store.getState().user
      });
    });
    
  }

  /**
   * 
   * @param {number} key - Key of visit in Store
   */
  handleRemoveVisit(key){

    /* @ */
    Store.dispatch({
      type      : "DELETE_VISIT",
      visitKey  : key
    })
  
  }

  /**
   * 
   * @param {number} key - Key of a visitant old 
   */
  handleSelectVisit(key){

    /* @ */
    let visitant = Store.getState().visitants[key];
        
    /* @ */
    Store.dispatch({
      type : "UPDATE_USER",
      user : visitant
    });

  }

  /**
  * @name insertVisitants
  * @desc Structure of a visitant
  * @return <LI>
  */
  eachVisitants(person,key){
    return (<li key={key} >
            <h1 onClick={() => this.handleSelectVisit(key)}>
            {person.name} - {person.country} - {person.date}
            </h1>
            <button onClick={() => this.handleRemoveVisit(key)}>X</button>
          </li>);
  }


  /**
   * @desc
   */
  render(){

    return (
      <section>
        <h1>Visitantes Anteriores</h1>
        <ul>
          {
            (
              this.state.visitants.length > 0 
                  ? this.state.visitants.map(this.eachVisitants)
                  : ''
            )
          }
        </ul>
      </section>
    );


  }

}

export default VisitantsView;