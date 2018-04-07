
/**
 * @desc React
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @desc Styles of challenge
 */
import './all.css';


/* @ Helper */
String.prototype.reverse = function(){
  return this.split('-').reverse().join('/');
};


/**
 * @name App
 * @desc Main of App
 */
class App extends React.Component{

  /* @ */
  constructor(props){

    /* @ */
    super(props);

    /* @ */
    this.state = {
      visitants : [],
      user      : {
        "name"      : "",
        "country"   : "",
        "date"      : ""
      }
    };

  }

  onAddVisitant(visitants){
    this.setState({
      visitants: visitants
    });
  }

  onRemoveVisitant(visitants){
    this.setState({
      visitants : visitants
    });
  }

  onSelectVisitant(visitant){
    this.setState({
      user : visitant
    }); 
  }

  onShowOutput(visitant){
    this.setState({
      user: visitant
    });
  }

  onChangeName(value){
    this.state.user.name = (value !== '' ? value : 'Desconocido');
    this.setState(this.state.user);
  }

  onChangeDate(value){
    this.state.user.date = value;
    this.setState(this.state.user);
  }

  /* @ */
  render(){
    return (<main id="root">
              <h1>FKTECH React Challenge</h1>
              <h3>Nombre: {(this.state.user.name !== '' ? this.state.user.name : 'Desconocido')}</h3>
              <hr />
              <FormView 
                  onSubmit={this.onAddVisitant.bind(this)} 
                  onShowOutput={this.onShowOutput.bind(this)}
                  onChangeName={this.onChangeName.bind(this)}
                  onChangeDate={this.onChangeDate.bind(this)}
                  visitants={this.state.visitants}
                  user={this.state.user}
              />
              <VisitantsView
                  onRemove={this.onRemoveVisitant.bind(this)} 
                  onSelect={this.onSelectVisitant.bind(this)}
                  visitants={this.state.visitants} 
              />
            </main>
    );

  }

}


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
      this.state = {
        "countrys"    : [],
      };

      /* @ */
      this.fetchCountrys();

      /* @ */
      this.onChangeDate = this.onChangeDate.bind(this);

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
          this.setState({countrys : response});

        }.bind(this));

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


    addVisit(e){

      /* @ */
      e.preventDefault();

      /* @ */
      let refVisitant      = this.props.visitants,
          newVisitantReact = {
            name    : this.refs.visit_name.value,
            country : this.refs.visit_country.value,
            date    : this.refs.visit_date.value
          },
          newVisitantStatic= Object.assign({},newVisitantReact);

      /* @ */
      refVisitant.push(newVisitantReact);

      /* @ */
      this.props.onSubmit(refVisitant);
      this.props.onShowOutput(newVisitantStatic);

    }

    
    onChangeName(e){
      this.props.onChangeName(e.target.value);
    }

    onChangeDate(e){
      this.props.onChangeDate(e.target.value);
    }

    render(){
      return(
        <section>

          <form onSubmit={this.addVisit.bind(this)}>
            <fieldset>
              <label>Nombre</label> 
              <input type="text"  placeholder="Tu Nombre aquí" 
                                  ref="visit_name" 
                                  onKeyDown={this.onChangeName.bind(this)} 
                                  onKeyUp={this.onChangeName.bind(this)} 
                                  onKeyPress={this.onChangeName.bind(this)} />
            </fieldset>
            <fieldset>
              <label>Pais</label>
              <select ref="visit_country">
                {
                  this.state.countrys.map(this.countryElement.bind(this))
                }
              </select>
            </fieldset>
            <fieldset>
              <label>Cumpleaños:<sub>(dd/mm/aaaa)</sub></label>
              <input type="date" ref="visit_date" onClick={this.onChangeDate}
                                                  onChange={this.onChangeDate}
                                                  onKeyDown={this.onChangeDate}
                                                  onKeyPress={this.onChangeDate}
                                                  onKeyUp={this.onChangeDate} />
            </fieldset>
            <button>Saludar</button>
          </form>

          {          
            <output style={(this.props.user.name === '' || this.props.user.date === '' ? {display:'none'} : {})} >
              Hola {this.props.user.name} de {this.props.user.country} el día {new Date(this.props.user.date.reverse()).getDate()} 
              del mes {new Date(this.props.user.date.reverse()).getMonth() + 1} tendrás {Math.abs(
                                                                                          new Date(this.props.user.date.reverse()).getFullYear() - new Date().getFullYear()
                                                                                        )} años
            </output>
          }

        </section>
      );
    }

}


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



ReactDOM.render(<App />,document.getElementById('root'));
