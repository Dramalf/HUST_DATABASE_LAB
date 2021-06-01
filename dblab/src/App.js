import {  Switch, Route, Redirect } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import { clientRoutes } from './routes'
import {isLogined} from './utility/auth'
function App() {
  return (
    isLogined()?
    <Provider store={store}>
      <div className="App">
          <Switch >
            {clientRoutes.map(route => {
              return (
                <Route key={route.path}  {...route}
                  render={routeProps => {
                    return <route.component {...routeProps} />
                  }}
                />
              );
            })}
            <Redirect to ='/view/search'/>
          </Switch>
      </div>
    </Provider>
    :<Redirect to="/login"/>
    );
}

export default App;
