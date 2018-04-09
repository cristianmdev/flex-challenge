
/**
 * @desc React
 */
import React            from 'react';

/* @ */
import FormView         from './components/FormView';
import VisitantsView    from './components/VisitantsView';

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
    this.setState(Object.assign(this.state.user,{
      name : (value !== '' ? value : 'Desconocido')
    }));
  }

  onChangeDate(value){
    this.setState(Object.assign(this.state.user,{
      date: value
    }));
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

export default App;