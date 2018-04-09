
/**
 * @desc React
 */
import React            from 'react';

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
    let date    = new Date(),
        thisYear = date.getFullYear(),
        thisMonth= date.getMonth() < 8 ? "0"+(date.getMonth()+1) : date.getMonth()+1,
        thisDay  = date.getDate() < 9  ? "0"+date.getDate()      : date.getDate();

    /* @ */
    this.state = {
      "countrys"    : [],
      "today"       : `${thisYear}-${thisMonth}-${thisDay}`
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
            <input type="date" ref="visit_date" max={this.state.today}
                                                onClick={this.onChangeDate}
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

export default FormView;