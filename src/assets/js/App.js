
/**
 * @desc React
 */
import React            from 'react';

/* @ */
import FormView         from './components/FormView';
import VisitantsView    from './components/VisitantsView';

/* @ */
import Store            from '../../store';

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
      user     : {
        "name" : 'Desconocido',
      }
    };

    /* @ */
    Store.subscribe(() => {
      this.setState({
        user : Store.getState().user,
      });
    });

  }

  /* @ */
  render(){
    return (<main id="root">
              <h1>FKTECH React Challenge</h1>
              <h3>Nombre: {(this.state.user.name !== '' ? this.state.user.name : 'Desconocido')}</h3>
              <hr />
              <FormView />
              <VisitantsView />
            </main>
    );

  }

}

export default App;