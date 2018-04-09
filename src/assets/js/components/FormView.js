/**
 * @desc React
 */
import React            from 'react';

/**
 * @desc 
 */
import Store            from '../../../store';

/* @ Helper */
String.prototype.reverse = function(){
  return this.split('-').reverse().join('/');
};

/**
 * @name FormView
 * @desc view of form
 */
class FormView extends React.Component{
  
  /**
     * @name constructor
     * @desc props by default
   */
  constructor(props){

    /* @ */
    super(props);

    /* @ */
    this.addVisit           = this.addVisit.bind(this);
    this.countryElement     = this.countryElement.bind(this);
    this.handleChangeName   = this.handleChangeName.bind(this);
    this.handleChangeDate   = this.handleChangeDate.bind(this);

    /* @ Data Local */
    this.state = {
      countrys : [],
      user     : {
        "name" : 'Desconocido',
        "date" : Store.getState().today
      },

    };

    /* @ Changes in Store */
    Store.subscribe(() => {
      this.setState({
        countrys : Store.getState().countrys,
        user     : Store.getState().user
      });
    });

    /* @ */
    this.fetchCountrys();

  }


  /**
     * @name componentWillUnmount
     * @desc after component initialize
   */
  fetchCountrys(){

    /* @ */
    fetch('https://restcountries.eu/rest/v2/region/Americas')
      .then(e => e.json())
      .then(function(response){

        /* @ */
        Store.dispatch({
          type      : 'UPDATE_COUNTRYS',
          countrys  : response
        });

      });

  }

  /**
     * @name countryElement
     * @desc Element option of select countrys
  */
  countryElement(country,key){

    /* @ */
    return (
      <option key={key} value={country.id}>{country.name}</option>
    );

  }

  /**
   * 
   * @param {*} e - Event form submit  
   */
  addVisit(e){

    /* @ */
    e.preventDefault();

    /* @ */
    let visit = {
      name    : this.refs.visit_name.value,
      country : this.refs.visit_country.value,
      date    : this.refs.visit_date.value
    };

    /* @ */
    Store.dispatch({
      type : "ADD_VISIT",
      visit: visit
    });

    /* @ */
    Store.dispatch({
      type : "UPDATE_USER",
      user : visit
    });

  }

  /**
   * @param {eventTarget} e - Event from input text (name)
   */
  handleChangeName(e){

    /* @ */
    Store.dispatch({
      type : "UPDATE_USER",
      user : Object.assign( {},
                            Store.getState().user,
                            {name: e.target.value})
    });

  }

  /**
   * 
   * @param {eventTarget} e - Event from input date (birthday) 
   */
  handleChangeDate(e){
    Store.dispatch({
      type    : "UPDATE_USER",
      user    : Object.assign( {},
                               Store.getState().user,
                               {date: e.target.value})
    });
  }

  render(){
    return(
      <section>

        <form onSubmit={this.addVisit}>
          <fieldset>
            <label>Nombre</label> 
            <input type="text"  placeholder="Tu Nombre aquí" 
                                ref="visit_name" 
                                onKeyDown={this.handleChangeName} 
                                onKeyUp={this.handleChangeName} 
                                onKeyPress={this.handleChangeName} />
          </fieldset>
          <fieldset>
            <label>Pais</label>
            <select ref="visit_country">
              {
                this.state.countrys.map(this.countryElement)
              }
            </select>
          </fieldset>
          <fieldset>
            <label>Cumpleaños:<sub>(dd/mm/aaaa)</sub></label>
            <input type="date" ref="visit_date" max={Store.getState().today}
                                                onClick={this.handleChangeDate}
                                                onChange={this.handleChangeDate}
                                                onKeyDown={this.handleChangeDate}
                                                onKeyPress={this.handleChangeDate}
                                                onKeyUp={this.handleChangeDate} />
          </fieldset>
          <button>Saludar</button>
        </form>

        {          
          <output style={(this.state.user.name === '' || this.state.user.date === '' ? {display:'none'} : {})} >
            Hola {this.state.user.name} de {this.state.user.country} el día {new Date(this.state.user.date.reverse()).getDate()} 
             del mes {new Date(this.state.user.date.reverse()).getMonth() + 1} tendrás {Math.abs(
                                                                                        new Date(this.state.user.date.reverse()).getFullYear() - new Date().getFullYear()
                                                                                      )} años
          </output>
        }

      </section>
    );
  }

}

export default FormView;